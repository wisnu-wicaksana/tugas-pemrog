// file: frontend/components/LogoutButton.js
'use client';

import Cookies from 'js-cookie'; // 1. Gunakan js-cookie agar konsisten
import { useRouter } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import CustomToast from './CustomToast'; // Impor toast kustom Anda

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 2. Hapus token dari cookie
    Cookies.remove('token', { path: '/' });

    // 3. Tampilkan notifikasi toast
    toast.custom((t) => (
      <CustomToast
        t={t}
        type="success"
        title="Logout Berhasil"
        message="Anda akan diarahkan ke halaman utama."
      />
    ));

    // Beri sedikit jeda agar toast sempat terlihat sebelum redirect
    setTimeout(() => {
      router.push('/');
      router.refresh(); // Lakukan refresh untuk memastikan semua state ter-reset
    }, 1500); // Jeda 1.5 detik
  };

  return (
    <div className="px-2">
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2.5 text-sm rounded-md 
                   text-gray-300 hover:text-white hover:bg-red-500/20 
                   transition-colors duration-200"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-400" />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;