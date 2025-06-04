// app/components/PaymentButton.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '../services/paymentService';
import { CheckoutSessionRequest } from '../types/Payment';

interface PaymentButtonProps {
  productId?: number;
  amount?: number;
  productName?: string;
  customerEmail?: string;
  metadata?: any;
  buttonText?: string | React.ReactNode;
  buttonClassName?: string;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: Error) => void;
}

export default function PaymentButton({
  productId,
  amount,
  productName,
  customerEmail,
  metadata,
  buttonText = 'Pay Now',
  buttonClassName = "bg-green-700 hover:bg-green-800 text-white",
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create the request payload
      const payload: CheckoutSessionRequest = {};
      
      if (productId) {
        payload.product_id = productId;
      } else {
        payload.amount = amount;
        payload.product_name = productName;
      }
      
      if (customerEmail) {
        payload.customer_email = customerEmail;
      }
      
      if (metadata) {
        payload.metadata = metadata;
      }
      
      // Call the backend API to create a checkout session
      const { url, id } = await createCheckoutSession(payload);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(id);
      }
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      
      // Set local error state
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      
      // Call error callback if provided
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      <Button 
        onClick={handlePayment}
        disabled={loading}
        className={buttonClassName}
      >
        {loading ? 'Processing...' : buttonText}
      </Button>
    </div>
  );
}