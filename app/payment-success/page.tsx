import { Suspense } from 'react';
import PaymentSuccessComponent from './PaymentSuccessComponent';

export default function PaymentSuccessPage() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <PaymentSuccessComponent />
      </Suspense>
    </>
  );
}