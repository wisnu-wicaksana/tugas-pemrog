'use client';

import { useState } from 'react';
import PaymentForm from '@/components/PaymentForm';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSubmit = async ({ amount, paymentMethod }) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, paymentMethod }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal membuat transaksi');

      // ✅ Redirect ke halaman pembayaran Tripay
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Pembayaran</h1>

      <PaymentForm onSubmit={handlePaymentSubmit} />

      {loading && <p className="text-blue-500 mt-4">Menghubungkan ke Tripay...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
