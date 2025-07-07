'use client';

import { useState, cloneElement } from 'react';
import { useProfile } from '@/hooks/useProfile';
import Header from '@/components/Header';

export default function DashboardLayout({ children }) {
  const { profile, loading: profileLoading, error } = useProfile();
  
  // State untuk search bar bisa dikelola di sini jika diperlukan nanti
  const [searchTerm, setSearchTerm] = useState('');

  if (error) {
    return <div className="flex h-screen items-center justify-center bg-gray-950 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header 
        user={profile} 
        loading={profileLoading}
        onSearch={setSearchTerm}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {profileLoading ? (
          <div className="text-center text-gray-400 mt-10">Memuat data Anda...</div>
        ) : (
          cloneElement(children, { user: profile, searchTerm: searchTerm })
        )}
      </main>
    </div>
  );
}