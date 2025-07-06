// file: frontend/hooks/useProfile.js
'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient'; // Menggunakan apiClient (axios) yang baru

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Cara baru memanggil API: lebih singkat dan token sudah otomatis.
        // Asumsi endpoint profil Anda adalah /user/profile
        const response = await apiClient.get('/user/me'); 
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat profil.');
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Hanya berjalan sekali saat komponen dimuat

  return { profile, loading, error };
};