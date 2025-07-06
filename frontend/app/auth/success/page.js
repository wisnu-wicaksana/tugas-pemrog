// file: frontend/app/auth/success/page.js
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie'; // Library untuk mengelola cookie

const AuthSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Simpan token ke dalam cookie
      // 'expires: 1' berarti cookie akan berlaku selama 1 hari
      Cookies.set('token', token, { expires: 1, path: '/' });

      // Tunggu 2 detik untuk memberikan efek transisi, lalu arahkan ke dashboard
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 2000); // 2000 milidetik = 2 detik

      // Membersihkan timer jika komponen di-unmount
      return () => clearTimeout(timer);
    } else {
      // Jika tidak ada token, arahkan kembali ke halaman login
      router.push('/');
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Animasi Spinner */}
      <svg className="animate-spin h-12 w-12 text-blue-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h1 className="text-2xl font-bold mb-2">Login Berhasil!</h1>
      <p className="text-gray-400">Anda akan diarahkan ke dashboard...</p>
    </div>
  );
};

export default AuthSuccessPage;