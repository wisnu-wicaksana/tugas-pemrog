'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import AnimeList from '@/components/anime/AnimeList';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // Mengambil data favorit dari server
  useEffect(() => {
    apiClient.get('/favorites')
      .then((res) => {
        setFavorites(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Efek ini untuk mencegah hydration error
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Jangan render konten utama sampai komponen ter-mount di klien
  if (!hasMounted) {
    return null;
  }

  // Fungsi untuk menangani penghapusan favorit
  const handleRemoveFavorite = (malIdToRemove) => {
    // Simpan state lama untuk rollback
    const originalFavorites = [...favorites];
    // Optimistic UI update
    setFavorites(prev => prev.filter(fav => fav.malId !== malIdToRemove));

    apiClient.delete(`/favorites/${malIdToRemove}`).catch(error => {
      console.error("Gagal menghapus favorit:", error);
      // Jika gagal, kembalikan state ke semula
      setFavorites(originalFavorites);
      alert("Gagal menghapus favorit.");
    });
  };

  // Menyesuaikan format data untuk komponen AnimeList
  const formattedFavorites = favorites.map(fav => ({
    mal_id: fav.malId,
    title: fav.title,
    images: {
      webp: { large_image_url: fav.imageUrl },
      jpg: { large_image_url: fav.imageUrl }
    },
    score: fav.score,
  }));

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Header />
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Anime Favorit Anda</h1>
          
          {loading ? (
            <p className="text-gray-400">Memuat favorit...</p>
          ) : favorites.length > 0 ? (
            <AnimeList
              anime={formattedFavorites}
              showUnfavorite={true}
              onRemove={handleRemoveFavorite}
            />
          ) : (
            <div className="text-center text-gray-400 mt-10">
              <p>Anda belum memiliki anime favorit.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}