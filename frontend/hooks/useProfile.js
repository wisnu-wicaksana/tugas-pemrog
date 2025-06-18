'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false); // tidak ada token, tidak perlu fetch
        return;
      }

      try {
        const data = await apiClient('GET', '/user/me', null, token);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
