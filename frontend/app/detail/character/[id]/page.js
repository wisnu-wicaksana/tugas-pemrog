// file: frontend/app/detail/character/[id]/page.js
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
import Link from 'next/link';

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
        <div className="h-12 w-3/4 bg-gray-800 rounded-md"></div>
        <div className="h-8 w-1/2 bg-gray-800 rounded-md mt-2"></div>
      </div>
      <div>
        <div className="h-7 w-1/3 bg-gray-800 rounded-md mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-11/12"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-800 rounded w-10/12"></div>
        </div>
      </div>
       <div>
        <div className="h-7 w-1/3 bg-gray-800 rounded-md mb-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-20 bg-gray-800 rounded-lg"></div>
            <div className="h-20 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

// Komponen kecil untuk menampilkan daftar anime/manga
const AppearanceCard = ({ item, type }) => (
  <Link href={`/detail/${type}/${item[type].mal_id}`} className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
    <div className="relative w-12 h-16 rounded-md overflow-hidden flex-shrink-0">
      <Image src={item[type].images.webp.image_url} alt={item[type].title} fill style={{ objectFit: 'cover' }} />
    </div>
    <div>
      <p className="text-sm font-bold text-white line-clamp-2">{item[type].title}</p>
      <p className="text-xs text-gray-400">{item.role}</p>
    </div>
  </Link>
);

// Komponen kecil untuk menampilkan pengisi suara
const VoiceActorCard = ({ actor }) => (
    <div className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg">
        <div className="relative w-12 h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image src={actor.person.images.jpg.image_url} alt={actor.person.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div>
            <p className="text-sm font-bold text-white">{actor.person.name}</p>
            <p className="text-xs text-gray-400">{actor.language}</p>
        </div>
    </div>
);


export default function CharacterDetailPage() {
  const params = useParams();
  const { id } = params;

  const { profile, loading: profileLoading } = useProfile();
  const [character, setCharacter] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      const charRes = await getApi(`characters/${id}/full`);
      
      if (charRes && charRes.data) {
        setCharacter(charRes.data);
      } else {
        setCharacter(null);
      }

      const favRes = await apiClient.get('/favorites');
      setFavorites(favRes.data || []);
      
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const isFavorited = favorites.some(fav => fav.malId === character?.mal_id);

  const handleFavoriteClick = async () => {
    if (!character) return;

    const originalIsFavorited = isFavorited;
    setFavorites(prev => 
      originalIsFavorited 
        ? prev.filter(fav => fav.malId !== character.mal_id) 
        : [...prev, { malId: character.mal_id }]
    );

    if (originalIsFavorited) {
      try {
        await apiClient.delete(`/favorites/${character.mal_id}`);
        toast.custom(t => <CustomToast t={t} type="delete" title="Dihapus" message={`"${character.name}" dihapus.`} />);
      } catch (error) {
        setFavorites(prev => [...prev, { malId: character.mal_id }]);
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menghapus." />);
      }
    } else {
      try {
        await apiClient.post('/favorites', {
          malId: character.mal_id,
          title: character.name,
          imageUrl: character.images?.webp?.image_url,
          type: 'CHARACTER',
        });
        toast.custom(t => <CustomToast t={t} type="success" title="Ditambahkan" message={`"${character.name}" ditambahkan.`} />);
      } catch (error) {
        setFavorites(prev => prev.filter(fav => fav.malId !== character.mal_id));
        toast.custom(t => <CustomToast t={t} type="error" title="Gagal" message="Gagal menambahkan." />);
      }
    }
  };

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

  
  return (
    <div className="bg-gray-950 min-h-screen">
        <Header user={profile} loading={profileLoading} /> 
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
                {/* Kolom Kiri: Poster dan Tombol Aksi */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Image src={character.images.webp.image_url} alt={`Cover of ${character.name}`} width={500} height={750} className="rounded-xl shadow-lg w-full max-w-sm mx-auto" priority/>
                   
                  </div>
                </div>
                {/* Kolom Kanan: Informasi Detail */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold">{character.name}</h1>
                    <h2 className="text-xl text-gray-400 mt-1">{character.name_kanji}</h2>
                    <div className="flex items-center space-x-2 mt-2 text-yellow-400">
                      <StarIcon className="w-5 h-5"/>
                      <span className="font-semibold">{character.favorites.toLocaleString()} Favorites</span>
                    </div>
                  </div>

                   <button onClick={handleFavoriteClick} className={`w-full mx-auto mt-4 p-3 rounded-lg font-bold flex items-center justify-center transition-colors ${isFavorited ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}><HeartIcon className="w-6 h-6 mr-2" />{isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</button>
                  
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tentang Karakter</h3>
                    <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">{character.about || 'Tidak ada informasi.'}</p>
                  </div>

                  

                  {character.anime?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Kemunculan di Anime</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {character.anime.map(item => <AppearanceCard key={item.anime.mal_id} item={item} type="anime" />)}
                      </div>
                    </div>
                  )}

                  {character.manga?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Kemunculan di Manga</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {character.manga.map(item => <AppearanceCard key={item.manga.mal_id} item={item} type="manga" />)}
                      </div>
                    </div>
                  )}

                  {character.voices?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Pengisi Suara</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {character.voices.map(actor => <VoiceActorCard key={actor.person.mal_id} actor={actor} />)}
                      </div>
                    </div>
                  )}
                </div>
            </div>
        </main>
    </div>
  );
}