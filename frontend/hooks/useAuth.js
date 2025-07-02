// hooks/useAuth.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token di FE:', token);

    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  return { loading };
}
