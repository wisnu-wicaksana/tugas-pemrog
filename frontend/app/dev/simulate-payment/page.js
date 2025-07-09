// file: frontend/app/dev/simulate-payment/page.js
'use client';

// 1. Impor Suspense dari React
import { Suspense } from 'react'; 
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';
import { ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/solid';

// 2. Ubah nama komponen utama Anda menjadi nama lain, misal: SimulatorUI
function SimulatorUI() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const merchantRef = searchParams.get('ref');
  const amount = searchParams.get('amount');

  const [loading, setLoading] = useState(false);

  const handleSimulatePayment = async () => {
    // ... (SELURUH LOGIKA handleSimulatePayment ANDA TETAP SAMA, TIDAK DIUBAH)
    setLoading(true);
    const payload = { merchant_ref: merchantRef, status: 'PAID' };
    try {
      await apiClient('POST', '/api/webhook/payment', payload);
      toast.custom(t => <CustomToast t={t} type="success" title="Pembayaran Berhasil!" message="Akun Anda telah di-upgrade." />);
      setTimeout(() => { router.push('/dashboard?status=success'); }, 1500);
    } catch (error) {
      toast.custom(t => <CustomToast t={t} type="error" title="Simulasi Gagal" message="Gagal menghubungi webhook." />);
      setLoading(false);
    }
  };

  // Seluruh bagian return JSX Anda tetap sama
  return (
    <div className="w-full max-w-lg">
        {/* ... (SELURUH KODE JSX ANDA DI SINI, TIDAK ADA YANG DIUBAH) ... */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Zukan<span className="text-blue-400">Verse</span> Checkout
          </h1>
          <p className="text-gray-400 mt-2">Selesaikan pembayaran untuk menjadi Member.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center font-bold text-white">
              <span>ZukanVerse Membership</span>
              <span>Rp {parseInt(amount || 0).toLocaleString('id-ID')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ref: <span className="font-mono">{merchantRef}</span>
            </p>
          </div>
          <div className="bg-gray-900/50 p-6">
            <button
              onClick={handleSimulatePayment}
              disabled={loading}
              className="w-full flex justify-center items-center p-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span>MEMPROSES...</span>
                </>
              ) : (
                'BAYAR SEKARANG'
              )}
            </button>
            <div className="flex justify-center items-center mt-4 text-xs text-gray-500">
              <LockClosedIcon className="h-4 w-4 mr-1.5" />
              <span>Pembayaran Aman via Tripay Sandbox</span>
            </div>
          </div>
        </div>
    </div>
  );
}

// 3. Buat komponen default export baru yang menjadi "pembungkus"
export default function SimulatePaymentPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center p-4">
      <Suspense fallback={<div className="text-white">Memuat...</div>}>
        <SimulatorUI />
      </Suspense>
    </div>
  );
}