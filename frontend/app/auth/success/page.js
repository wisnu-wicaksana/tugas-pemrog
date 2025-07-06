// file: app/auth/success/page.js
// TIDAK ADA 'use client' di sini. Ini adalah Server Component.

import { Suspense } from 'react';
import AuthSuccessHandler from '@/components/AuthSuccessHandler'; // Pastikan path ini benar

// Ini adalah UI yang ditampilkan SANGAT CEPAT selagi komponen utama disiapkan
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Memverifikasi...</h1>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessHandler />
    </Suspense>
  );
}