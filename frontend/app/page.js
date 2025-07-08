// file: frontend/app/page.js

import Image from 'next/image';
import LoginButton from '@/components/LoginButton';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-900 text-white">
      {/* Kolom Kiri - Gambar Latar */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://www.ghibli.jp/gallery/howl040.jpg"
          alt="Anime Themed Background"
          fill
          className="object-cover"
        />
        {/* Lapisan gelap agar teks mudah dibaca */}
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Temukan dan Kelola Daftar Anime Favoritmu.
          </h1>
          <p className="text-lg text-gray-300">
            Semua di satu tempat. Didukung oleh Jikan API.
          </p>
        </div>
      </div>

      {/* Kolom Kanan - Area Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Selamat Datang</h2>
          <p className="text-gray-400 mb-8">
            Silakan login dengan akun Google Anda untuk melanjutkan.
          </p>
          
          <div className="flex justify-center">
            {/* Tombol login yang sudah Anda punya */}
            <LoginButton />
          </div>

          <p className="text-xs text-gray-500 mt-12">
            Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami.
          </p>
        </div>
      </div>
    </main>
  );
}