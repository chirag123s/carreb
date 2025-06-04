// app/payment-cancel/page.tsx
"use client";

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <XCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-6">Payment Cancelled</h1>
        <p className="mb-6">
          Your payment process was cancelled. No charges were made to your account.
        </p>
        <div className="mt-6">
          <Link 
            href="/"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}