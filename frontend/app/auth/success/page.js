// file: frontend/app/auth/success/page.js
import { Suspense } from 'react'
import SuccessClient from './SuccessClient' // Impor komponen klien kita

// Komponen untuk tampilan loading
function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Memuat...</p>
    </div>
  )
}

// Ini adalah Server Component yang akan dirender pertama kali
export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessClient />
    </Suspense>
  )
}