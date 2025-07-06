// file: frontend/app/dashboard/page.js

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DashboardClient from './dashboardClient';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getApi } from '@/lib/jikan';
import { apiClientServer } from '@/lib/apiClientServer';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let user = null;

  // Mendekode token untuk mendapatkan data pengguna
  if (token) {
    try {
      user = jwt.decode(token.value);
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }

  // Mengambil semua data yang dibutuhkan secara bersamaan
  const [topAnime, topManga, topCharacters, favoritesRes] = await Promise.all([
    getApi('top/anime', 'limit=10'),
    getApi('top/manga', 'limit=10'),
    getApi('top/characters', 'limit=10'),
    apiClientServer().get('/favorites')
  ]);

  const userFavorites = favoritesRes?.data || [];

return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 lg:ml-64">
        {/* Header dihapus dari sini */}
        {/* DashboardClient sekarang akan merender Header dan kontennya */}
        <DashboardClient 
          user={user} 
          topAnime={topAnime}
          topManga={topManga}
          topCharacters={topCharacters}
          initialFavorites={userFavorites}
        />
      </main>
    </div>
  );

}