// app/services/paymentService.ts
import axios from 'axios';
import { 
  CheckoutSessionRequest, 
  PaymentSession, 
  PaymentStatus, 
  Product, 
  StripeConfig 
} from '../types/Payment';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

/**
 * Create a Stripe checkout session
 */
export const createCheckoutSession = async (
  data: CheckoutSessionRequest
): Promise<PaymentSession> => {
  try {
    const response = await axios.post<PaymentSession>(
      `${API_URL}/payment/create-checkout-session/`, 
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Get the status of a payment by session ID
 */
export const getPaymentStatus = async (
  sessionId: string
): Promise<PaymentStatus> => {
  try {
    const response = await axios.get<PaymentStatus>(
      `${API_URL}/payment/status/?session_id=${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

/**
 * Get list of available products
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_URL}/payment/products/`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get Stripe configuration
 */
export const getStripeConfig = async (): Promise<StripeConfig> => {
  try {
    const response = await axios.get<StripeConfig>(
      `${API_URL}/payment/config/`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Stripe config:', error);
    throw error;
  }
};