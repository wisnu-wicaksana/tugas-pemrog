// file: frontend/app/detail/anime/[id]/page.js
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

// Komponen kecil untuk menampilkan info dengan label
const InfoPill = ({ label, value }) => (
  <div className="flex flex-col bg-gray-800 p-3 rounded-lg text-center">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="font-bold text-white text-md">{value || 'N/A'}</span>
  </div>
);

export default function AnimeDetailPage() {
  const params = useParams();
  const { id } = params;

  // Mengambil data profil dan status loadingnya
  const { profile, loading: profileLoading } = useProfile();
  
  const [anime, setAnime] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efek untuk mengambil data anime dan favorit
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      // Ambil data detail anime dari Jikan API
      const animeRes = await getApi(`anime/${id}/full`);
      
      if (animeRes && animeRes.data) {
        setAnime(animeRes.data);
      } else {
        setAnime(null); // Set null jika tidak ditemukan
      }

      // Ambil data favorit dari backend Anda
      const favRes = await apiClient.get('/favorites');
      setFavorites(favRes.data || []);
      
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Cek apakah anime ini sudah ada di daftar favorit
  const isFavorited = favorites.some(fav => fav.malId === anime?.mal_id);

  const handleFavoriteClick = async () => {
    if (!anime) return;

    // Optimistic UI untuk respons instan
    const originalIsFavorited = isFavorited;
    setFavorites(prev => 
      originalIsFavorited 
        ? prev.filter(fav => fav.malId !== anime.mal_id) 
        : [...prev, { malId: anime.mal_id }]
    );

    if (originalIsFavorited) {
      // Logika Hapus Favorit
      try {
        await apiClient.delete(`/favorites/${anime.mal_id}`);
        toast.custom(t => <CustomToast t={t} type="delete" title="Dihapus" message={`"${anime.title}" dihapus.`} />);
      } catch (error) {
        setFavorites(prev => [...prev, { malId: anime.mal_id }]); // Kembalikan jika gagal
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menghapus." />);
      }
    } else {
      // Logika Tambah Favorit
      try {
        await apiClient.post('/favorites', {
          malId: anime.mal_id,
          title: anime.title,
          imageUrl: anime.images?.webp?.large_image_url,
          score: anime.score,
          type: 'ANIME',
        });
        toast.custom(t => <CustomToast t={t} type="success" title="Ditambahkan" message={`"${anime.title}" ditambahkan.`} />);
      } catch (error) {
        setFavorites(prev => prev.filter(fav => fav.malId !== anime.mal_id)); // Kembalikan jika gagal
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menambahkan." />);
      }
    }
  };

  // Tampilan loading utama
  if (loading) {
    return (
        <div className="bg-gray-950 min-h-screen">
            <Header loading={true} />
            <div className="text-center text-gray-400 p-10">Memuat data anime...</div>
        </div>
    );
  }

  // Tampilan jika anime tidak ditemukan
  if (!anime) {
    return (
        <div className="bg-gray-950 min-h-screen">
            <Header user={profile} loading={profileLoading} />
            <div className="text-center text-gray-400 p-10">Anime tidak ditemukan.</div>
        </div>
    );
  }
  
  // Tampilan utama halaman detail anime
  return (
    <div className="bg-gray-950 min-h-screen">
        <Header user={profile} loading={profileLoading} /> 
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
                {/* Kolom Kiri: Poster dan Tombol Aksi */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Image src={anime.images.webp.large_image_url} alt={`Poster of ${anime.title}`} width={500} height={750} className="rounded-xl shadow-lg w-full max-w-sm mx-auto" priority/>
                    <button onClick={handleFavoriteClick} className={`w-full max-w-sm mx-auto mt-4 p-3 rounded-lg font-bold flex items-center justify-center transition-colors ${isFavorited ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}><HeartIcon className="w-6 h-6 mr-2" />{isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</button>
                  </div>
                </div>
                {/* Kolom Kanan: Informasi Detail */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-blue-400 font-semibold">{anime.type} • {anime.status}</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold my-2">{anime.title}</h1>
                  <h2 className="text-xl text-gray-400 mb-6">{anime.title_japanese}</h2>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-2xl font-bold">{anime.score || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{anime.scored_by?.toLocaleString() || 0} suara</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
                    <InfoPill label="Rank" value={`#${anime.rank || 'N/A'}`} />
                    <InfoPill label="Popularity" value={`#${anime.popularity || 'N/A'}`} />
                    <InfoPill label="Episodes" value={anime.episodes || '?'} />
                    <InfoPill label="Duration" value={anime.duration || '?'} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Sinopsis</h3>
                  <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">{anime.synopsis || 'Tidak ada sinopsis.'}</p>
                  
                  {anime.trailer?.embed_url && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-white mb-4">Trailer</h3>
                      <div className="aspect-video">
                        <iframe src={anime.trailer.embed_url} title="Anime Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full rounded-xl"></iframe>
                      </div>
                    </div>
                  )}
                </div>
            </div>
        </main>
    </div>
  );
}