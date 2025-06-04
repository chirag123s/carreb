//app/verify-email/page.tsx

'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function VerifyEmailPage() {
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastResendTime, setLastResendTime] = useState<number | null>(null);
  const [resendCount, setResendCount] = useState(0);

  // Check if user is already verified and redirect
  useEffect(() => {
    if (user?.email_verified) {
      router.push('/dashboard'); // or wherever verified users should go
    }
  }, [user?.email_verified, router]);

  // Early return if still loading or user is already verified
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Authenticated</h1>
          <p className="text-gray-600 mb-6">Please log in to verify your email.</p>
          <Button onClick={() => router.push('/auth/login')} className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleResendVerification = async () => {
    if (!user?.sub) {
      setErrorMessage('User information not available');
      setResendStatus('error');
      return;
    }

    // Enhanced rate limiting (client-side)
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    
    // Check if we've hit the hourly limit (3 emails per hour)
    if (resendCount >= 3) {
      setErrorMessage('You have reached the maximum of 3 verification emails per hour. Please try again later.');
      setResendStatus('rate-limited');
      return;
    }

    // Check if we need to wait (1 minute between sends)
    if (lastResendTime && (now - lastResendTime) < oneMinute) {
      const secondsLeft = Math.ceil((oneMinute - (now - lastResendTime)) / 1000);
      setErrorMessage(`Please wait ${secondsLeft} seconds before requesting another email`);
      setResendStatus('rate-limited');
      return;
    }

    setIsResending(true);
    setResendStatus('idle');
    setErrorMessage('');

    try {
      // Call our API route to resend verification email
      // Note: Removed Authorization header - API handles auth internally via M2M credentials
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.sub,
          userEmail: user.email // Optional: for better logging/error messages
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setResendStatus('rate-limited');
          setErrorMessage('Too many verification emails sent. Please wait before trying again.');
        } else if (response.status === 400) {
          setErrorMessage('Invalid user or user already verified.');
          setResendStatus('error');
        } else if (response.status === 403) {
          setErrorMessage('Unable to send verification email. Please contact support.');
          setResendStatus('error');
        } else if (response.status === 500) {
          setErrorMessage('Server error. Please try again later or contact support.');
          setResendStatus('error');
        } else {
          throw new Error(responseData.error || `Server error: ${response.status}`);
        }
        return;
      }

      setResendStatus('success');
      setLastResendTime(now);
      setResendCount(prev => prev + 1);
      console.log('Verification email sent with job ID:', responseData.jobId);
      
    } catch (error) {
      console.error('Error resending verification:', error);
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setErrorMessage('Network error. Please check your connection and try again.');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('Failed to resend verification email. Please try again.');
      }
      setResendStatus('error');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckEmail = async () => {
    try {
      // Force refresh of user data to check if email is now verified
      await getAccessTokenSilently({ 
        cacheMode: 'off'
      });
      
      // If user data refresh doesn't trigger a redirect, manually reload
      // This will cause the useEffect to check email_verified status again
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error refreshing user data:', error);
      // Fallback to page reload if token refresh fails
      window.location.reload();
    }
  };

  const getResendButtonText = () => {
    if (isResending) return 'Sending...';
    if (resendStatus === 'rate-limited') return 'Please wait...';
    return 'Resend verification email';
  };

  const isResendDisabled = isResending || resendStatus === 'rate-limited' || resendCount >= 3;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <Mail className="h-16 w-16 text-green-600 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h1>
        
        <p className="text-gray-600 mb-2">
          We've sent a verification link to:
        </p>
        
        <p className="font-semibold text-gray-900 mb-6">
          {user?.email}
        </p>
        
        <p className="text-sm text-gray-600 mb-6">
          Click the link in the email to verify your account. You may need to check your spam folder.
        </p>

        {/* Status Messages */}
        {resendStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800 text-sm">
                Verification email sent successfully! Please check your inbox.
              </p>
            </div>
          </div>
        )}

        {resendStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">
                {errorMessage || 'Failed to resend verification email. Please try again.'}
              </p>
            </div>
          </div>
        )}

        {resendStatus === 'rate-limited' && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800 text-sm">
                {errorMessage || 'Please wait before requesting another verification email.'}
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            onClick={handleCheckEmail} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            I've verified my email
          </Button>
          
          <Button 
            onClick={handleResendVerification} 
            variant="outline" 
            className="w-full"
            disabled={isResendDisabled}
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              getResendButtonText()
            )}
          </Button>
        </div>

        {/* Resend counter */}
        {resendCount > 0 && (
          <div className="mt-4 text-xs text-gray-500">
            Verification emails sent: {resendCount}/3 this hour
          </div>
        )}

        {/* Help section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            <strong>Not receiving emails?</strong>
          </p>
          <ul className="text-xs text-gray-500 text-left space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure {user?.email} is correct</li>
            <li>• Wait a few minutes for email delivery</li>
            <li>• Try the resend button (limited to 3 per hour)</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            Still having trouble? Contact us at{' '}
            <a href="mailto:support@carreb.com" className="text-green-600 hover:underline">
              support@carreb.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}