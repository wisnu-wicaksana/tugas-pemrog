'use client';
import { useState } from 'react';
import Link from "next/link";

export default function PaymentForm({ onSubmit }) {
  const [amount, setAmount] = useState(10000);
  const [paymentMethod, setPaymentMethod] = useState('BRIVA');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label>Jumlah Pembayaran</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Metode Pembayaran</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="BRIVA">BRIVA</option>
          <option value="QRIS">QRIS</option>
          <option value="BNIVA">BNI VA</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Bayar Sekarang
      </button>
      <Link href="/dashboard">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                kembali 
              </button>
        </Link>

    </form>
  );
}
