'use client';
import PaymentForm from "@/components/PaymentForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async ({ amount, paymentMethod }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, paymentMethod }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.paymentUrl;
      } else {
        alert(data.message || "Gagal membuat transaksi");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat membuat pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Pembayaran</h1>
      <PaymentForm onSubmit={handlePayment} />
      {loading && <p className="mt-4 text-gray-500">Membuat transaksi...</p>}
    </div>
  );
}
