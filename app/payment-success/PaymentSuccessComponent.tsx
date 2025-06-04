// app/payment-success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPaymentStatus } from '../services/paymentService';
import { PaymentStatus } from '../types/Payment';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function PaymentSuccessComponent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const data = await getPaymentStatus(sessionId);
        setPaymentStatus(data);
      } catch (error) {
        setError('Failed to verify payment status. Please contact customer support.');
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [sessionId]);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-green-700 rounded-full border-t-transparent mb-4"></div>
            <p>Verifying your payment...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Payment Verification Failed</h1>
            <p className="mb-6">{error}</p>
            <Link 
              href="/"
              className="text-green-700 hover:text-green-800 font-medium"
            >
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
              <Link 
                href="/"
                className="text-green-700 hover:text-green-800 font-medium"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}