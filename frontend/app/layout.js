// file: frontend/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AnimeList Project',
  description: 'Final Project Pemrograman Kelompok',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <Toaster
          // 1. Ubah posisi ke kanan bawah
          position="bottom-right" 
          reverseOrder={false}
          toastOptions={{
            // 2. Atur durasi notifikasi (opsional)
            duration: 3000, 
            
            // 3. Styling default untuk semua toast
            style: {
              background: '#1F2937', // Abu-abu gelap (bg-gray-800)
              color: '#F9FAFB',      // Putih keabuan (text-gray-50)
              border: '1px solid #374151', // Border abu-abu (border-gray-700)
              padding: '12px',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}