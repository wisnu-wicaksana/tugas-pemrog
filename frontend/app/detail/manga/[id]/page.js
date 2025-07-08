// file: frontend/app/detail/manga/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { getApi } from "@/lib/jikan";
import apiClient from '@/lib/apiClient';
import Header from "@/components/Header";
import Image from 'next/image';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';

// Tambahkan komponen ini di dalam file: app/detail/manga/[id]/page.js

const DetailPageSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    {/* Kolom Kiri Skeleton */}
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="aspect-[2/3] w-full max-w-sm mx-auto bg-gray-800 rounded-xl"></div>
        <div className="h-12 w-full max-w-sm mx-auto mt-4 bg-gray-800 rounded-lg"></div>
      </div>
    </div>
    {/* Kolom Kanan Skeleton */}
    <div className="lg:col-span-2 space-y-8">
      <div>
        <div className="h-6 w-1/4 bg-gray-800 rounded-md"></div>
        <div className="h-12 w-3/4 bg-gray-800 rounded-md mt-3"></div>
        <div className="h-8 w-1/2 bg-gray-800 rounded-md mt-2"></div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        <div className="h-16 bg-gray-800 rounded-lg"></div>
        <div className="h-16 bg-gray-800 rounded-lg"></div>
        <div className="h-16 bg-gray-800 rounded-lg"></div>
        <div className="h-16 bg-gray-800 rounded-lg"></div>
      </div>
      <div>
        <div className="h-7 w-1/3 bg-gray-800 rounded-md mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-11/12"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

// Komponen kecil untuk menampilkan info dengan label
const InfoPill = ({ label, value }) => (
  <div className="flex flex-col bg-gray-800 p-3 rounded-lg text-center">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="font-bold text-white text-md">{value || 'N/A'}</span>
  </div>
);

export default function MangaDetailPage() {
  const params = useParams();
  const { id } = params;

  // Mengambil data profil dan status loadingnya
  const { profile, loading: profileLoading } = useProfile();
  
  const [manga, setManga] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efek untuk mengambil data manga dan favorit
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      // Ambil data detail manga dari Jikan API
      const mangaRes = await getApi(`manga/${id}/full`);
      
      if (mangaRes && mangaRes.data) {
        setManga(mangaRes.data);
      } else {
        setManga(null); // Set null jika tidak ditemukan
      }

      // Ambil data favorit dari backend Anda
      const favRes = await apiClient.get('/favorites');
      setFavorites(favRes.data || []);
      
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Cek apakah manga ini sudah ada di daftar favorit
  const isFavorited = favorites.some(fav => fav.malId === manga?.mal_id);

  const handleFavoriteClick = async () => {
    if (!manga) return;

    // Optimistic UI untuk respons instan
    const originalIsFavorited = isFavorited;
    setFavorites(prev => 
      originalIsFavorited 
        ? prev.filter(fav => fav.malId !== manga.mal_id) 
        : [...prev, { malId: manga.mal_id }]
    );

    if (originalIsFavorited) {
      // Logika Hapus Favorit
      try {
        await apiClient.delete(`/favorites/${manga.mal_id}`);
        toast.custom(t => <CustomToast t={t} type="delete" title="Dihapus" message={`"${manga.title}" dihapus.`} />);
      } catch (error) {
        setFavorites(prev => [...prev, { malId: manga.mal_id }]); // Kembalikan jika gagal
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menghapus." />);
      }
    } else {
      // Logika Tambah Favorit
      try {
        await apiClient.post('/favorites', {
          malId: manga.mal_id,
          title: manga.title,
          imageUrl: manga.images?.webp?.large_image_url,
          score: manga.score,
          type: 'MANGA',
        });
        toast.custom(t => <CustomToast t={t} type="success" title="Ditambahkan" message={`"${manga.title}" ditambahkan.`} />);
      } catch (error) {
        setFavorites(prev => prev.filter(fav => fav.malId !== manga.mal_id)); // Kembalikan jika gagal
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menambahkan." />);
      }
    }
  };

  // Tampilan loading utama
// Kode baru dengan skeleton
if (loading) {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Header loading={true} />
      <main className="p-4 sm:p-6 lg:p-8">
        <DetailPageSkeleton />
      </main>
    </div>
  );
}
  
  // Tampilan utama halaman detail manga
  return (
    <div className="bg-gray-950 min-h-screen">
        <Header user={profile} loading={profileLoading} /> 
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
                {/* Kolom Kiri: Poster dan Tombol Aksi */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Image src={manga.images.webp.large_image_url} alt={`Cover of ${manga.title}`} width={500} height={750} className="rounded-xl shadow-lg w-full max-w-sm mx-auto" priority/>
                  </div>
                </div>
                {/* Kolom Kanan: Informasi Detail */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-blue-400 font-semibold">{manga.type} • {manga.status}</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold my-2">{manga.title}</h1>
                  <h2 className="text-xl text-gray-400 mb-6">{manga.title_japanese}</h2>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-2xl font-bold">{manga.score || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{manga.scored_by?.toLocaleString() || 0} suara</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
                    <InfoPill label="Rank" value={`#${manga.rank || 'N/A'}`} />
                    <InfoPill label="Popularity" value={`#${manga.popularity || 'N/A'}`} />
                    <InfoPill label="Chapters" value={manga.chapters || '?'} />
                    <InfoPill label="Volumes" value={manga.volumes || '?'} />
                  </div>

                  <button onClick={handleFavoriteClick} className={`w-full mx-auto mb-8 p-3 rounded-lg font-bold flex items-center justify-center transition-colors ${isFavorited ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}><HeartIcon className="w-6 h-6 mr-2" />{isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</button>
                  
                  <h3 className="text-xl font-bold mb-2">Sinopsis</h3>
                  <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">{manga.synopsis || 'Tidak ada sinopsis.'}</p>
                </div>
            </div>
        </main>
    </div>
  );
}