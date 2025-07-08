// file: frontend/app/dashboard/dashboardClient.js
"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import apiClient from "@/lib/apiClient";
import { getApi } from "@/lib/jikan";
import Header from "@/components/Header";
import AnimeList from "@/components/anime/AnimeList";
import MangaList from "@/components/manga/MangaList";
import CharacterList from "@/components/character/CharacterList";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from '@heroicons/react/24/solid';

// Komponen baru untuk kerangka (skeleton) kartu
const CardSkeleton = () => (
  // Tidak ada lagi kelas untuk lebar di sini
  <div> 
    <div className="relative w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
    <div className="h-4 bg-gray-800 rounded mt-2 w-3/4 animate-pulse"></div>
    <div className="h-3 bg-gray-800 rounded mt-1 w-1/2 animate-pulse"></div>
  </div>
);

// Komponen baru untuk kerangka section carousel
// Ganti juga komponen CarouselSkeleton dengan ini:

const CarouselSkeleton = () => (
  <section>
    {/* Kerangka untuk judul section */}
    <div className="h-8 bg-gray-800 rounded-md w-1/3 mb-4 animate-pulse"></div>
    
    {/* Menggunakan grid yang sama persis dengan AnimeList */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {/* Kita tampilkan 5 kerangka untuk mengisi satu baris di layar besar */}
      {[...Array(5)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </section>
);

const SectionHeader = ({ title, href }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-3">
      {/* Garis aksen vertikal */}
      <div className="w-1 h-7 bg-blue-400 rounded-full"></div>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">{title}</h2>
    </div>
    <Link href={href || '#'} className="group flex items-center space-x-1 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
      <span>Lihat Semua</span>
      <ChevronRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  </div>
);

export default function DashboardClient({ topAnime, topManga, topCharacters }) {
  const { profile, loading: profileLoading, error } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (profile) {
      apiClient.get("/favorites").then((res) => setFavorites(res.data || [])).catch(console.error);
    }
  }, [profile]);

  const handleFavoriteChange = async () => {
    const res = await apiClient.get("/favorites");
    setFavorites(res.data || []);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const searchDelay = setTimeout(() => {
      Promise.all([
        getApi('anime', `q=${searchTerm}&limit=10`),
        getApi('manga', `q=${searchTerm}&limit=10`),
        getApi('characters', `q=${searchTerm}&limit=10`),
      ]).then(([animeRes, mangaRes, charRes]) => {
        setSearchResults({
          anime: animeRes?.data || [],
          manga: mangaRes?.data || [],
          characters: charRes?.data || [],
        });
        setIsSearching(false);
      });
    }, 500);
    return () => clearTimeout(searchDelay);
  }, [searchTerm]);

// ▼▼▼ PERSIAPAN DATA UNTUK HERO SLIDER ▼▼▼
  const heroItems = [
    topAnime?.data?.[0] ? { type: 'anime', data: topAnime.data[0] } : null,
    topManga?.data?.[0] ? { type: 'manga', data: topManga.data[0] } : null,
    topCharacters?.data?.[0] ? { type: 'character', data: { ...topCharacters.data[0], title: topCharacters.data[0].name } } : null
  ].filter(Boolean); // Filter untuk menghapus item yang null

  // Efek untuk slider otomatis
  useEffect(() => {
    if (heroItems.length > 1) {
      const timer = setTimeout(() => {
        setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
      }, 7000); // Ganti slide setiap 7 detik
      return () => clearTimeout(timer);
    }
  }, [currentHeroIndex, heroItems.length]);

  // ================= RENDER LOGIC =================

  // 1. Tampilan saat loading awal (profil pengguna)
  if (profileLoading) {
    return (
      <div className="bg-gray-950 min-h-screen">
        <Header loading={true} />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="h-80 md:h-[450px] bg-gray-800 rounded-2xl mb-12 animate-pulse"></div>
          <div className="space-y-12">
            <CarouselSkeleton />
            <CarouselSkeleton />
          </div>
        </main>
      </div>
    );
  }
  
  // Tampilan jika ada error
  if (error) {
    return <div className="flex h-screen items-center justify-center bg-gray-950 text-red-400">Error: {error}</div>;
  }

  // Tampilan utama setelah loading selesai
  return (
    <div className="bg-gray-950 min-h-screen">
      <Header user={profile} loading={profileLoading} onSearch={setSearchTerm} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-12">
          {!searchTerm && heroItems.length > 0 && (
            <section className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden">
              {heroItems.map((item, index) => (
                <div 
                  key={item.data.mal_id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image src={item.data.images?.webp?.large_image_url || item.data.images?.webp?.image_url} alt={item.data.title} fill style={{ objectFit: 'cover' }} className="opacity-30" priority={index === 0} />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                    <p className="font-semibold text-blue-400 mb-1">Top #{index + 1} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">{item.data.title}</h1>
                    <p className="text-gray-300 mt-2 max-w-2xl line-clamp-2 md:line-clamp-3 text-sm md:text-base">{item.data.synopsis || `Karakter favorit dengan ${item.data.favorites?.toLocaleString()} suara.`}</p>
                    <Link href={`/detail/${item.type}/${item.data.mal_id}`} className="mt-6 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-transform hover:scale-105 shadow-lg">Lihat Detail</Link>
                  </div>
                </div>
              ))}
              {/* Tombol Navigasi Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroItems.map((_, index) => (
                  <button key={index} onClick={() => setCurrentHeroIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentHeroIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}></button>
                ))}
              </div>
            </section>
          )}

          {/* 2. Tampilan saat sedang mencari */}
          {searchTerm && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Hasil Pencarian untuk &quot;{searchTerm}&quot;</h1>
              {isSearching ? (
                // Tampilkan skeleton saat loading pencarian
                <div className="space-y-12">
                  <CarouselSkeleton />
                  <CarouselSkeleton />
                </div>
              ) : searchResults ? (
                <div className="space-y-12">
                  <section>
                    <SectionHeader title="Anime" href={`/search/anime/${searchTerm}`} />
                    <AnimeList anime={searchResults.anime} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
                  </section>
                  <section>
                    <SectionHeader title="Manga" href={`/search/manga/${searchTerm}`} />
                    <MangaList manga={searchResults.manga} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
                  </section>
                  <section>
                    <SectionHeader title="Karakter" href={`/search/character/${searchTerm}`} />
                    <CharacterList characters={searchResults.characters} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
                  </section>
                </div>
              ) : (
                <p className="text-gray-400">Tidak ada hasil ditemukan.</p>
              )}
            </div>
          )}
          
          {/* 3. Tampilan default (Top 10) */}
          {!searchTerm && (
            <div className="space-y-12">
              <section>
                <SectionHeader title="Top Anime" href="/allAnimeTop" />
                <AnimeList anime={topAnime?.data} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
              </section>
              <section>
                <SectionHeader title="Top Manga" href="/allTopManga" />
                <MangaList manga={topManga?.data} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
              </section>
              <section>
                <SectionHeader title="Top Characters" href="/allTopCharacter" />
                <CharacterList characters={topCharacters?.data} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}