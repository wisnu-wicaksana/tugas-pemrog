// components/CallbackClient.js
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const processAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Arahkan pengguna ke halaman utama setelah login berhasil
        router.push('/dashboard');
      }
    };

    processAuth();
  }, [router, supabase]);

  // Anda dapat menampilkan pesan loading di sini
  return <p>Processing authentication...</p>;
}