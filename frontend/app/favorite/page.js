// File: app/favorite/page.js
'use client';
import { useEffect, useState } from 'react';
import { getApi } from '@/lib/jikan';
import { apiClient } from '@/lib/apiClient';
import AnimeList from '@/components/anime /AnimeList';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    apiClient('GET', '/favorites', null, token)
      .then((res) => setFavorites(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Anime Favorit Anda</h1>
      {loading ? <p>Loading...</p> : <AnimeList
  anime={favorites}
  showUnfavorite
  onRemove={(malId) =>
    setFavorites((prev) => prev.filter((a) => a.malId !== malId))
  }
/>}
<a href="/anime" className="inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
        ← Kembali ke Anime
      </a>
      
    </div>
  );
}