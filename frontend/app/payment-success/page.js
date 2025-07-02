import { Suspense } from 'react';
import PaymentStatus from './PaymentStatus';

export default function PaymentSuccessPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Status Pembayaran</h1>
      <Suspense fallback={<p>Memuat status...</p>}>
        <PaymentStatus />
      </Suspense>
    </div>
  );
}