'use client';

import { useEffect, useState } from 'react';
import CreatorList from './CreatorList';
import { getApi } from '@/lib/jikan';
import Link from 'next/link';

export default function Creator() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi('top/people', 'limit=20') // Jikan v4 endpoint for top people (creators)
      .then((res) => {
        console.log("✔️ Debug res:", res);
        setCreators(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-4">
      

      <h1 className="text-2xl font-bold mb-4">Top Creators (Preview)</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <CreatorList creators={creators} />
      )}

      <div className="mt-6 text-center">
        <Link
          href="/allTopCreator"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lihat Semua Creator
        </Link>
      </div>
    </main>
  );
}
