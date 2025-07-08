// file: frontend/app/allAnimeTop/page.js
'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import apiClient from '@/lib/apiClient';
import { getApi } from '@/lib/jikan';
import Header from '@/components/Header';
import AnimeList from '@/components/anime/AnimeList';

const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-3">
      {/* Garis aksen vertikal */}
      <div className="w-1 h-7 bg-blue-400 rounded-full"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">{title}</h2>
    </div>
  </div>
);

// Komponen helper untuk kerangka (skeleton) kartu
const CardSkeleton = () => (
  <div> 
    <div className="relative w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
    <div className="h-4 bg-gray-800 rounded mt-2 w-3/4 animate-pulse"></div>
  </div>
);

// Komponen helper untuk kerangka grid
const GridSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
);


export default function AllTopAnimePage() {
  const { profile, loading: profileLoading } = useProfile();
  
  const [anime, setAnime] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data awal (halaman 1)
  const fetchInitialData = () => {
    setLoading(true);
    getApi('top/anime', `page=1&limit=20`)
      .then((res) => {
        setAnime(res.data || []);
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
    const nextPageData = await getApi('top/anime', `page=${page}&limit=20`);
    if (nextPageData?.data) {
      setAnime(prev => [...prev, ...nextPageData.data]);
      setPage(prev => prev + 1);
      setHasNextPage(nextPageData.pagination.has_next_page);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} />
      <main className="p-4 sm:p-6 lg:p-8">
        <SectionHeader title="Top Anime Terpopuler" />
        
        {/* Tampilkan kerangka jika loading, atau konten jika sudah siap */}
        {loading && anime.length === 0 ? (
          <GridSkeleton />
        ) : (
          <AnimeList
            anime={anime}
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