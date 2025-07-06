// file: frontend/components/Header.js
'use client';

import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

// Header sekarang menerima props 'onSearch' untuk memberitahu induknya
const Header = ({ user, onSearch }) => {

  const handleInputChange = (event) => {
    // Setiap kali pengguna mengetik, panggil fungsi onSearch dari induk
    // dan kirimkan nilai inputnya
    onSearch(event.target.value);
  };

  const openSidebar = () => {
    console.log("Open sidebar");
  };

  return (
    <header className="w-full bg-gray-900/70 backdrop-blur-lg p-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
      <button onClick={openSidebar} className="lg:hidden p-2 text-gray-400 hover:text-white">
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Search Bar yang sudah cerdas */}
      <div className="relative hidden sm:block w-full max-w-xs">
        <input
          type="text"
          placeholder="Cari di halaman ini..."
          onChange={handleInputChange} // Menggunakan onChange untuk pencarian real-time
          className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || '?'}
        </div>
      </div>
    </header>
  );
};

export default Header;