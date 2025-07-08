// file: frontend/app/favorite/page.js
'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import Header from '@/components/Header';
import { useProfile } from '@/hooks/useProfile';
import toast from 'react-hot-toast';
import { HeartIcon } from '@heroicons/react/24/solid';

// Impor semua komponen list yang sudah ada
import AnimeList from '@/components/anime/AnimeList';
import MangaList from '@/components/manga/MangaList';
import CharacterList from '@/components/character/CharacterList';

const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-3">
      {/* Garis aksen vertikal */}
      <div className="w-1 h-7 bg-blue-400 rounded-full"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">{title}</h2>
    </div>
  </div>
);

const CardSkeleton = () => (
  <div> 
    <div className="relative w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
  </div>
);

const SectionSkeleton = () => (
    <section>
        <div className="h-8 bg-gray-800 rounded-md w-1/3 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
    </section>
);

const PageSkeleton = () => (
    <div className="space-y-12">
        <div className="h-10 bg-gray-800 rounded-md w-1/2 animate-pulse"></div>
        <div className="space-y-10">
            <SectionSkeleton />
            <SectionSkeleton />
        </div>
    </div>
);


export default function FavoritePage() {
  const { profile, loading: profileLoading } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data favorit dari server
  const fetchFavorites = () => {
    setLoading(true);
    apiClient.get('/favorites')
      .then((res) => {
        setFavorites(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (profile) {
      fetchFavorites();
    } else if (!profileLoading) {
      setLoading(false);
    }
  }, [profile, profileLoading]);

  // Fungsi ini akan dipanggil oleh komponen kartu untuk me-refresh daftar
  const handleFavoriteChange = () => {
    fetchFavorites();
  };

  // "Terjemahkan" data favorit menjadi format yang dimengerti oleh komponen kartu
  const formatDataForCard = (fav) => ({
    mal_id: fav.malId,
    title: fav.title,
    images: {
      webp: { large_image_url: fav.imageUrl, image_url: fav.imageUrl },
      jpg: { large_image_url: fav.imageUrl, image_url: fav.imageUrl }
    },
    score: fav.score || null,
    year: fav.year,
    name: fav.title, 
    favorites: fav.score || 0,
    url: `/detail/character/${fav.malId}`
  });

  // Logika filter berdasarkan imageUrl
  const animeFavorites = favorites.filter(fav => fav.imageUrl.includes('/anime/'));
  const mangaFavorites = favorites.filter(fav => fav.imageUrl.includes('/manga/'));
  const characterFavorites = favorites.filter(fav => fav.imageUrl.includes('/characters/'));

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <HeartIcon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Koleksi Favorit Saya</h1>
            <p className="text-gray-400">Semua anime, manga, dan karakter yang Anda simpan.</p>
          </div>
        </div>
        
        {loading ? (
          <PageSkeleton /> // Gunakan skeleton saat loading
        ) : favorites.length > 0 ? (
          <div className="space-y-10">
            {animeFavorites.length > 0 && (
              <section>
                <SectionHeader title="Anime" />
                <AnimeList
                  anime={animeFavorites.map(formatDataForCard)}
                  favorites={favorites}
                  onFavoriteChange={handleFavoriteChange}
                />
              </section>
            )}
            {mangaFavorites.length > 0 && (
              <section>
                <SectionHeader title="Manga" />
                <MangaList
                  manga={mangaFavorites.map(formatDataForCard)}
                  favorites={favorites}
                  onFavoriteChange={handleFavoriteChange}
                />
              </section>
            )}
            {characterFavorites.length > 0 && (
              <section>
                                <SectionHeader title="Karakter" />
                <CharacterList
                  characters={characterFavorites.map(formatDataForCard)}
                  favorites={favorites}
                  onFavoriteChange={handleFavoriteChange}
                />
              </section>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <p>Anda belum memiliki item favorit.</p>
          </div>
        )}
      </main>
    </div>
  );
}