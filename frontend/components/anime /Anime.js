'use client';

import { useEffect, useState } from 'react';
import AnimeList from '@/components/anime/AnimeList';
import { getApi } from '@/lib/jikan';
import Link from 'next/link';

export default function Anime() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    getApi('top/anime', 'limit=20')
      .then((res) => setAnime(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <main className="p-4">
        <div className="mb-4 text-right">
          <Link href="/favorite">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Lihat Favorit
            </button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">Top Anime</h1>
        <AnimeList anime={anime} showAdd />
      </main>

      <div className="p-4">
        <Link href="/allAnimeTop">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Lihat Semua Anime
          </button>
        </Link>
      </div>
    </>
  );
}
