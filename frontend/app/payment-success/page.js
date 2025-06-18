'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [message, setMessage] = useState('Memeriksa status pembayaran...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-success?reference=${reference}`);
        const text = await res.text();
        setMessage(text);
      } catch (err) {
        setMessage("Gagal memeriksa status pembayaran");
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      checkStatus();
    } else {
      setMessage("Reference tidak ditemukan di URL");
      setLoading(false);
    }
  }, [reference]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Status Pembayaran</h1>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
}
