// file: frontend/components/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, HeartIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import LogoutButton from './LogoutButton';

// toggleSidebar dan onSearch tidak lagi digunakan di sini, tapi kita biarkan untuk fleksibilitas
const Header = ({ user, onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="w-full bg-gray-900/60 backdrop-blur-xl p-3 flex justify-between items-center sticky top-0 z-50 border-b border-white/10">
      
      {/* Bagian Kiri */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          Nime<span className="text-blue-400">Verse</span>
        </Link>
      </div>

      {/* Bagian Tengah - Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari anime favoritmu..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2.5 px-5 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      
      {/* Bagian Kanan - Menu Pengguna */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
          className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
        </button>

        {/* Dropdown Menu yang Didesain Ulang */}
        {isDropdownOpen && (
          <div 
            className="absolute right-0 mt-3 w-72 bg-gray-800/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2"
          >
            {/* User Info */}
            <div className="px-4 py-3">
              <p className="font-bold text-white truncate">{user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
            
            <div className="h-px bg-white/10 mx-2 my-1"></div>
            
            <nav className="py-1">
              <Link href="/favorite" className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-md transition-colors">
                <HeartIcon className="h-5 w-5 mr-3 text-red-400" />
                Favorit Saya
              </Link>
            </nav>
            
            {/* Status Paket dengan Tombol Upgrade Kondisional */}
            <div className="px-4 py-2">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Status</span>
                  {user?.isMember ? (
                    <span className="text-xs font-bold py-1 px-2.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">MEMBER</span>
                  ) : (
                    <span className="text-xs font-bold py-1 px-2.5 rounded-full bg-gray-600/50 text-gray-300 border border-gray-500/50">NON-MEMBER</span>
                  )}
                </div>
                
                {/* ▼▼▼ INI PERUBAHAN UTAMANYA ▼▼▼ */}
                {/* Tombol ini hanya muncul jika user BUKAN member */}
                {!user?.isMember && (
                  <Link href="/payment" className="group flex items-center justify-center w-full mt-3 p-2 bg-blue-500/80 rounded-lg text-white font-bold text-sm hover:bg-blue-500 transition-all">
                    <ArrowUpCircleIcon className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
                    Upgrade ke Member
                  </Link>
                )}
              </div>
            </div>

            <div className="h-px bg-white/10 mx-2 my-1"></div>

            <div className="p-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;