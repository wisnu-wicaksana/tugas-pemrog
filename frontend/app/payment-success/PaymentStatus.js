'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const merchantRef = searchParams.get('tripay_merchant_ref');

  useEffect(() => {
    if (merchantRef) {
      const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-success?tripay_merchant_ref=${merchantRef}`;
      window.location.href = backendUrl;
    }
  }, [merchantRef]);

  return <p>Mengecek status pembayaran dan mengarahkan ke dashboard...</p>;
}
