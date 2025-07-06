// file: frontend/app/dashboard/dashboardClient.js
'use client';

import { useState } from 'react';
// ... (impor lainnya tetap sama)
import AnimeList from '@/components/anime/AnimeList';
import MangaList from '@/components/manga/MangaList';
import CharacterList from '@/components/character/CharacterList';
import Header from '@/components/Header'; // Impor Header

export default function DashboardClient({ user, topAnime, topManga, topCharacters, initialFavorites }) {
  // 1. Buat state untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(initialFavorites);
  // ... (handleFavoriteChange tetap sama)

  // 2. Filter daftar anime berdasarkan searchTerm
  const filteredAnime = topAnime?.data?.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Lakukan hal yang sama untuk manga dan karakter
  const filteredManga = topManga?.data?.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredCharacters = topCharacters?.data?.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    // Kita pindahkan Header ke sini agar bisa berbagi state
    <>
      <Header user={user} onSearch={setSearchTerm} />
      <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Selamat Datang, {user?.name || 'Pengguna'}!
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Anime</h2>
            <AnimeList 
              anime={filteredAnime} // 3. Gunakan data yang sudah difilter
              favorites={favorites}
              // ... sisa props
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Manga</h2>
            <MangaList manga={filteredManga} />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Top Characters</h2>
            <CharacterList characters={filteredCharacters} />
          </section>
        </div>
      </main>
    </>
  );
}