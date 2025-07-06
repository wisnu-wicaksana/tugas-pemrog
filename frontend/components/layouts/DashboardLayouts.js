// file: frontend/components/layouts/DashboardLayout.js
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useProfile } from '@/hooks/useProfile'; 


// Komponen ini menerima 'user' dan 'children' (konten halaman)
export default function DashboardLayout({ user, children }) {
     const { profile, loading: profileLoading, error } = useProfile();
  
  
  return (
    <div className="flex bg-gray-950">
     
      
      <div className={`flex-1 flex flex-col transition-all duration-300 `}>
        <Header 
          user={user} 
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}