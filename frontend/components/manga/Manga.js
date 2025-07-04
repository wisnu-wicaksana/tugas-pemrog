'use client';

import { useEffect, useState } from 'react';
import MangaList from './MangaList';
import { getApi } from '@/lib/jikan';
import Link from 'next/link';

export default function Manga() {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  setLoading(true);
  getApi('top/manga', 'limit=20')
    .then((res) => {
      console.log("Debug res:", res); // tampilkan semua isi
      setManga(res.data); // tambahkan .data di sini
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);


  return (
    <main className="p-4">
     

      <h1 className="text-2xl font-bold mb-4">Top Manga (Preview)</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <MangaList manga={manga} />
      )}

      <div className="mt-6 text-center">
        <Link
          href="/allTopManga"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lihat Semua Manga
        </Link>
      </div>
    </main>
  );
}
