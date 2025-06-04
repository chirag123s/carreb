// app/types/Payment.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentSession {
  id: string;
  url: string;
  payment_id: number;
}

export interface PaymentStatus {
  id: number;
  uuid: string;
  customer?: number;
  product?: number;
  amount_total: number;
  currency: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_type: 'one_time' | 'subscription';
  session_id: string;
  stripe_payment_intent_id?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface CheckoutSessionRequest {
  product_id?: number;
  amount?: number;
  product_name?: string;
  customer_email?: string;
  metadata?: any;
  success_url?: string;
  cancel_url?: string;
}

export interface StripeConfig {
  publishableKey: string;
}