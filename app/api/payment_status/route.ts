
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8001';

export async function GET(req: NextRequest) {
  try {
    // Get session_id from query params
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' }, 
        { status: 400 }
      );
    }
    
    // Forward the request to your Django backend
    const response = await axios.get(
      `${API_URL}/payment/status/?session_id=${sessionId}`
    );
    
    // Return the result from your backend
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error getting payment status:', error);
    
    let message = 'An unexpected error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    
    return NextResponse.json(
      { error: message }, 
      { status: 500 }
    );
  }
}