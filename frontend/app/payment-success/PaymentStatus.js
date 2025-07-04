'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Komponen ini sekarang berisi semua logika sisi klien
export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('tripay_reference');
  const [message, setMessage] = useState('Memeriksa status pembayaran...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-success?reference=${tripay_reference}`);
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

  if (loading) return <p>Loading...</p>;
  
  return <p>{message}</p>;
}