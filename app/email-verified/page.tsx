'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function EmailVerifiedPage() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'verified' | 'error'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        if (user.email_verified) {
          setVerificationStatus('verified');
        } else {
          setVerificationStatus('error');
        }
      } else {
        setVerificationStatus('error');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);

  const handleContinue = () => {
    router.push('/car-search');
  };

  const handleResendVerification = () => {
    // This will redirect to login and allow user to request new verification email
    loginWithRedirect();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {verificationStatus === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying your email...
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your email verification.
            </p>
          </>
        )}

        {verificationStatus === 'verified' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-6">
              Great! Your email has been verified. You can now access all features of CarReb.
            </p>
            <Button onClick={handleContinue} className="w-full btn-dark-green">
              Continue to CarReb
            </Button>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Issue
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. This might be because the link has expired or you haven't verified your email yet.
            </p>
            <div className="space-y-3">
              <Button onClick={handleResendVerification} className="w-full btn-dark-green">
                Resend Verification Email
              </Button>
              <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                Go to Homepage
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}