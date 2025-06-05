"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPaymentStatus } from '../services/paymentService';
import { garageService } from '../services/garageService';
import { PaymentStatus } from '../types/Payment';
import { CheckCircle, AlertCircle, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth0();
  const sessionId = searchParams.get('session_id');
  const searchUid = searchParams.get('sid');
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [integrationComplete, setIntegrationComplete] = useState<boolean>(false);
  const [garageEntryCreated, setGarageEntryCreated] = useState<boolean>(false);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const processPaymentSuccess = async () => {
      try {
        // 1. Verify payment status with Stripe
        const paymentData = await getPaymentStatus(sessionId);
        setPaymentStatus(paymentData);

        // 2. If payment is successful and user is authenticated, process integration
        if (paymentData.payment_status === 'paid' && isAuthenticated && user) {
          await handlePaymentIntegration(paymentData);
        }
      } catch (error) {
        setError('Failed to verify payment status. Please contact customer support.');
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    processPaymentSuccess();
  }, [sessionId, isAuthenticated, user, searchUid]);

  const handlePaymentIntegration = async (paymentData: PaymentStatus) => {
    try {
      if (!user?.sub || !user?.email) {
        throw new Error('User authentication data not available');
      }

      // Process payment success and move search to garage if applicable
      const integrationResult = await garageService.processPaymentSuccess({
        payment_uuid: paymentData.uuid,
        user_id: user.sub,
        user_email: user.email,
        search_uid: searchUid || undefined,
        plan_name: 'Subscription Plan', // This should come from payment metadata
      });

      if (integrationResult.status === 'success') {
        setIntegrationComplete(true);
        setGarageEntryCreated(!!integrationResult.garage_entry_id);
      }
    } catch (error) {
      console.error('Error processing payment integration:', error);
      // Don't set error here as payment was successful, just log the integration issue
    }
  };

  const renderStatusIcon = () => {
    if (!paymentStatus) return <AlertCircle className="w-16 h-16 text-yellow-500" />;
    
    switch (paymentStatus.payment_status) {
      case 'paid':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      default:
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
    }
  };

  const handleContinueToGarage = () => {
    router.push('/garage');
  };

  const handleBackToSearch = () => {
    if (searchUid) {
      router.push(`/smart-car-finder?sid=${searchUid}`);
    } else {
      router.push('/car-search');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-green-700 rounded-full border-t-transparent mb-4"></div>
            <p>Processing your payment...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Payment Verification Failed</h1>
            <p className="mb-6">{error}</p>
            <Link href="/" className="text-green-700 hover:text-green-800 font-medium">
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {renderStatusIcon()}
            </div>
            <h1 className="text-2xl font-bold mb-4">
              {paymentStatus?.payment_status === 'paid' ? 'Payment Successful!' : 
               paymentStatus?.payment_status === 'pending' ? 'Payment Processing' : 
               'Payment Failed'}
            </h1>
            
            {paymentStatus?.payment_status === 'paid' && (
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-green-800 mb-2">Welcome to CarReb!</h3>
                  <p className="text-green-700 text-sm">
                    Your subscription is now active and you have full access to all CarReb features.
                  </p>
                  {garageEntryCreated && (
                    <div className="flex items-center mt-2 text-green-700">
                      <Car className="w-4 h-4 mr-2" />
                      <span className="text-sm">Your car search has been added to your garage!</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {garageEntryCreated && (
                    <Button onClick={handleContinueToGarage} className="w-full btn-dark-green">
                      View My Garage
                    </Button>
                  )}
                  
                  {searchUid && (
                    <Button onClick={handleBackToSearch} variant="outline" className="w-full">
                      Continue Car Search
                    </Button>
                  )}
                  
                  <Link href="/car-search">
                    <Button variant="outline" className="w-full">
                      Find More Cars
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            
            {paymentStatus && (
              <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                <p className="font-semibold">Payment Details:</p>
                <p>Amount: {paymentStatus.currency.toUpperCase()} ${Number(paymentStatus.amount_total).toFixed(2)}</p>
                <p>Status: {paymentStatus.payment_status?.charAt(0).toUpperCase() + paymentStatus.payment_status?.slice(1) || 'Unknown'}</p>
                <p>Transaction ID: {paymentStatus.session_id?.substring(0, 10)}...</p>
                <p>Date: {new Date(paymentStatus.created_at).toLocaleString()}</p>
              </div>
            )}
            
            <div className="mt-6">
              <Link href="/" className="text-green-700 hover:text-green-800 font-medium">
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
