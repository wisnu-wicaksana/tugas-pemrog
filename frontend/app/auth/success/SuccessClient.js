// file: frontend/app/auth/success/SuccessClient.js
'use client' // <-- Tanda ini wajib untuk komponen sisi klien

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SuccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Ambil tujuan redirect dari URL, jika tidak ada, kembali ke halaman utama
    const next = searchParams.get('next') || '/dashboard'

    // Arahkan pengguna setelah 1.5 detik
    const timer = setTimeout(() => {
      router.push(next)
    }, 1500)

    // Cleanup function untuk membersihkan timer
    return () => clearTimeout(timer)
  }, [router, searchParams])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Login berhasil! Anda akan segera diarahkan...</p>
    </div>
  )
}