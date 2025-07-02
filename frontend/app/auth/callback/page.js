// 2. Ini adalah Komponen Anak (Client Component).
// Di sinilah kita menaruh 'use client' dan semua hooks.
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Jika ada token, simpan dan arahkan ke dashboard
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } else {
      // Jika TIDAK ada token, lebih baik arahkan ke halaman login
      // Daripada ke dashboard. Ini perbaikan logika juga.
      console.error("Gagal login: Token tidak ditemukan.");
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Cukup jalankan sekali saat komponen dimuat

  // Komponen ini tidak perlu menampilkan UI apa pun,
  // karena tugasnya hanya redirect.
  return null;
}