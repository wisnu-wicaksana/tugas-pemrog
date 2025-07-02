'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    console.log('✅ Token dari URL:', token);

    if (token) {
      localStorage.setItem('token', token);
      router.replace('/dashboard'); // ✅ langsung ke dashboard
    } else {
      console.warn('❌ Token tidak ditemukan di URL');
    }
  }, [searchParams, router]);

  return <p>Menyimpan token dan mengalihkan ke dashboard...</p>;
}
