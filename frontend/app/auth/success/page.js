'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.replace('/dashboard'); 
    } else {
      router.replace('/login'); 
    }
  }, [router, searchParams]);

  return <p>Proses login... mohon tunggu.</p>;
}
