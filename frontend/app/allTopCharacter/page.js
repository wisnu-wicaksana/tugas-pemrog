// file: frontend/app/allTopCharacter/page.js
'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import apiClient from '@/lib/apiClient';
import { getApi } from '@/lib/jikan';
import Header from '@/components/Header';
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

// Komponen helper untuk kerangka (skeleton) baris karakter
const RowSkeleton = () => (
  <div className="flex items-center p-3 bg-gray-800/50 rounded-lg animate-pulse">
    <div className="w-10 h-6 bg-gray-700 rounded-md"></div>
    <div className="w-12 h-16 bg-gray-700 rounded-md ml-4"></div>
    <div className="ml-4 flex-grow space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
    <div className="w-6 h-6 bg-gray-700 rounded-full ml-4"></div>
  </div>
);

// Komponen helper untuk kerangka daftar (list)
const ListSkeleton = () => (
    <div className="space-y-3">
        {[...Array(10)].map((_, i) => <RowSkeleton key={i} />)}
    </div>
);


export default function AllTopCharacterPage() {
  const { profile, loading: profileLoading } = useProfile();
  
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data awal (halaman 1)
  const fetchInitialData = () => {
    setLoading(true);
    getApi('top/characters', `page=1&limit=20`)
      .then((res) => {
        setCharacters(res.data || []);
        setHasNextPage(res.pagination?.has_next_page || false);
        setPage(2); // Siapkan untuk panggilan "load more" selanjutnya
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Ambil data awal dan data favorit saat komponen dimuat
  useEffect(() => {
    fetchInitialData();
    if (profile) {
      apiClient.get('/favorites').then(res => setFavorites(res.data || []));
    }
  }, [profile]);

  const handleFavoriteChange = async () => {
    const res = await apiClient.get('/favorites');
    setFavorites(res.data || []);
  };

  const handleLoadMore = async () => {
    if (!hasNextPage || loading) return;

    setLoading(true);
    const nextPageData = await getApi('top/characters', `page=${page}&limit=20`);
    if (nextPageData?.data) {
      setCharacters(prev => [...prev, ...nextPageData.data]);
      setPage(prev => prev + 1);
      setHasNextPage(nextPageData.pagination.has_next_page);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} />
      <main className="p-4 sm:p-6 lg:p-8">
        <SectionHeader title="Top Karakter Terpopuler" />
        
        {/* Tampilkan kerangka jika loading, atau konten jika sudah siap */}
        {loading && characters.length === 0 ? (
          <ListSkeleton />
        ) : (
          <CharacterList
            characters={characters}
            favorites={favorites}
            onFavoriteChange={handleFavoriteChange}
          />
        )}

        {/* Tombol "Muat Lebih Banyak" */}
        <div className="flex justify-center mt-8">
          {hasNextPage && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}