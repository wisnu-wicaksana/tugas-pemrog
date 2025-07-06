'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import apiClient from '@/lib/apiClient';
import Header from '@/components/Header';
import AnimeList from '@/components/anime/AnimeList';
import MangaList from '@/components/manga/MangaList';
import CharacterList from '@/components/character/CharacterList';
import Link from 'next/link';

export default function DashboardClient({ topAnime, topManga, topCharacters }) {
  const { profile, loading: profileLoading, error } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Ambil data favorit setelah profil berhasil dimuat
  useEffect(() => {
    if (profile) { // Hanya jalankan jika profil sudah ada
      apiClient.get('/favorites')
        .then(res => setFavorites(res.data || []))
        .catch(console.error);
    }
  }, [profile]); // Dijalankan kembali jika 'profile' berubah

  const handleFavoriteChange = async () => {
    const res = await apiClient.get('/favorites');
    setFavorites(res.data || []);
  };

  const filteredAnime = topAnime?.data?.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredManga = topManga?.data?.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredCharacters = topCharacters?.data?.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} onSearch={setSearchTerm} />
      <main className="p-4 sm:p-6 lg:p-8">
        {profileLoading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : (
          <div className="space-y-12">
            <h1 className="text-3xl font-bold text-white">
              Selamat Datang, {profile?.name || 'Pengguna'}!
            </h1>
            
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Top Anime</h2>
                <Link href="/allAnimeTop" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Lihat Semua</Link>
              </div>
              <AnimeList 
                anime={filteredAnime}
                favorites={favorites}
                onFavoriteChange={handleFavoriteChange}
              />
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Top Manga</h2>
                <Link href="/allTopManga" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Lihat Semua</Link>
              </div>
              <MangaList manga={filteredManga} />
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Top Characters</h2>
                <Link href="/allTopCharacter" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Lihat Semua</Link>
              </div>
              <CharacterList characters={filteredCharacters} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}