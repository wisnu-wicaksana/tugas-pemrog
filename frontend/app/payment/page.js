"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";
import Header from "@/components/Header";
import { useProfile } from "@/hooks/useProfile";
import { CheckCircleIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import CustomToast from "@/components/CustomToast";

// Component untuk Form Pembayaran yang sudah didesain
const PaymentForm = ({ onSubmit, loading }) => {
  // Anda bisa sesuaikan ini jika sudah memiliki metode pembayaran dari backend
  const paymentMethods = [
    { code: "Qris", name: "QRIS" },
    { code: "BRIVA", name: "BRI" },
    { code: "BCAVA", name: "BCA" },
    { code: "MANDIRIVA", name: "Mandiri" },
    { code: "BNIVA", name: "BNI" },
    { code: "Alfamart", name: "Alfamart" },
  ];
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].code);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Harga membership bisa Anda tentukan di sini atau ambil dari backend
    onSubmit({ amount: 15000, paymentMethod: selectedMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Pilih Metode Pembayaran
        </label>
       <div className="grid grid-cols-3 gap-4">
  {paymentMethods.map((method) => (
    <button
      key={method.code}
      type="button"
      onClick={() => setSelectedMethod(method.code)}
      // 1. Tambahkan kelas flexbox untuk centering
      className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all text-center ${
        selectedMethod === method.code
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
      }`}
    >
      {/* 2. Tambahkan kelas 'truncate' di sini */}
      <p className="font-semibold text-white truncate" title={method.name}>
        {method.name}
      </p>
    </button>
  ))}
</div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span>Memproses...</span>
          </>
        ) : (
          <span>Lanjutkan ke Pembayaran</span>
        )}
      </button>
    </form>
  );
};

// Komponen Utama Halaman Pembayaran
export default function PaymentPage() {
  const { profile, loading: profileLoading } = useProfile();
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async ({ amount, paymentMethod }) => {
    setLoading(true);

    try {
      // Menggunakan apiClient yang secara otomatis mengirim token
      const response = await apiClient.post("/payment/create", {
        amount,
        paymentMethod,
      });

      if (response.data && response.data.paymentUrl) {
        // Redirect ke halaman pembayaran Tripay
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error("URL pembayaran tidak diterima.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Gagal membuat transaksi.";
      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          title="Terjadi Kesalahan"
          message={errorMessage}
        />
      ));
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} />
      <main className="p-4 sm:p-6 lg:p-8 flex justify-center items-center">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header Halaman */}
          <div className="text-center">
            <CreditCardIcon className="mx-auto h-12 w-8 text-blue-400" />
            <h1 className="mt-4 text-3xl font-extrabold text-white">
              Upgrade Membership
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Dapatkan akses ke semua fitur premium.
            </p>
          </div>

          {/* Panel Pembayaran */}
          <div className="bg-gray-800/50 border border-white/10 rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Kiri: Keuntungan Membership */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">
                Keuntungan Member
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Tambahkan anime, manga, dan karakter ke favorit tanpa batas.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Dapatkan badge &quot;MEMBER&quot; eksklusif di profil Anda.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Mendukung pengembangan ZukanVerse agar lebih baik lagi.
                  </span>
                </li>
              </ul>
            </div>
            {/* Kolom Kanan: Form Pembayaran */}
            <div>
              <PaymentForm onSubmit={handlePaymentSubmit} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
