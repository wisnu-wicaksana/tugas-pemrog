'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Simpan token di localStorage (bisa juga pakai cookie)
      localStorage.setItem('token', token);

      // Arahkan user ke dashboard
      router.replace('/dashboard');
    } else {
      console.error('Token tidak ditemukan di URL');
    }
  }, [searchParams, router]);

  return <p>Menyimpan token dan mengalihkan...</p>;
}
