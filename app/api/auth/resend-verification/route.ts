import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail } = await request.json();

    // Validate userId format (Auth0 user IDs typically start with auth0|, google-oauth2|, etc.)
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Valid User ID is required' },
        { status: 400 }
      );
    }

    // Additional validation: ensure userId follows Auth0 format
    if (!userId.includes('|')) {
      return NextResponse.json(
        { error: 'Invalid User ID format' },
        { status: 400 }
      );
    }

    console.log('Resending verification email for user:', userId, userEmail ? `(${userEmail})` : '');

    // Get Management API token
    const managementToken = await getManagementApiToken();

    if (!managementToken) {
      console.error('Failed to get management API token');
      return NextResponse.json(
        { error: 'Failed to authenticate with Auth0' },
        { status: 500 }
      );
    }

    // Send verification email using Auth0 Management API
    const verificationResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/jobs/verification-email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${managementToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        }),
      }
    );

    if (!verificationResponse.ok) {
      const errorData = await verificationResponse.json();
      console.error('Auth0 Management API error:', errorData);
      
      // Handle specific Auth0 errors
      if (verificationResponse.status === 429) {
        return NextResponse.json(
          { error: 'Too many verification emails sent. Please wait before trying again.' },
          { status: 429 }
        );
      }
      
      if (verificationResponse.status === 400) {
        // Check the specific error message
        if (errorData.message?.includes('already verified') || errorData.error === 'already_verified') {
          return NextResponse.json(
            { error: 'Email is already verified.' },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { error: 'Invalid user or request.' },
          { status: 400 }
        );
      }

      if (verificationResponse.status === 403) {
        return NextResponse.json(
          { error: 'Insufficient permissions to send verification email.' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again later.' },
        { status: verificationResponse.status }
      );
    }

    const result = await verificationResponse.json();
    console.log('Verification email job created:', result.id);

    return NextResponse.json(
      { 
        success: true,
        message: 'Verification email sent successfully',
        jobId: result.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in resend-verification API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Function to get Management API token
async function getManagementApiToken(): Promise<string | null> {
  try {
    // Validate required environment variables
    if (!process.env.AUTH0_M2M_CLIENT_ID || !process.env.AUTH0_M2M_CLIENT_SECRET || !process.env.NEXT_PUBLIC_AUTH0_DOMAIN) {
      console.error('Missing required Auth0 environment variables');
      return null;
    }

    const tokenResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_M2M_CLIENT_ID,
          client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
          audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
          grant_type: 'client_credentials',
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Failed to get management token:', errorData);
      return null;
    }

    const tokenData = await tokenResponse.json();
    console.log('Successfully obtained management token');
    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting management token:', error);
    return null;
  }
}