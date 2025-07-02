'use client'; // File ini sekarang menjadi komponen klien

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Komponen ini akan menangani logika setelah Suspense selesai.
function AuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Simpan tokennya
      localStorage.setItem('token', token);
      // Ganti URL ke dashboard. router.replace() lebih disarankan
      // karena tidak menambahkan entri ke riwayat browser.
      router.replace('/dashboard'); 
    } else {
      // Jika karena alasan tertentu token tidak ada, kembali ke login.
      console.error("Otentikasi callback tanpa token. Mengarahkan ke login.");
      router.replace('/'); 
    }
  }, [router, searchParams]);

  return <p>Mengalihkan Anda ke dasbor...</p>;
}

// Komponen Halaman Utama
export default function SuccessPage() {
    return (
        // Suspense memastikan bahwa AuthSuccessHandler (yang menggunakan useSearchParams)
        // hanya akan dijalankan di sisi klien setelah semuanya siap.
        <Suspense fallback={<p>Memproses otentikasi...</p>}>
            <AuthSuccessHandler />
        </Suspense>
    );
}