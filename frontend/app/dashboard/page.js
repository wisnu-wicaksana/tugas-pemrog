import DashboardClient from './dashboardClient';
import { getApi } from '@/lib/jikan';

export default async function DashboardPage() {
  // Hanya ambil data publik. Data user akan diurus oleh DashboardClient.
  const [topAnime, topManga, topCharacters] = await Promise.all([
    getApi('top/anime', 'limit=10'),
    getApi('top/manga', 'limit=10'),
    getApi('top/characters', 'limit=10')
  ]);

  return (
    <DashboardClient 
      topAnime={topAnime}
      topManga={topManga}
      topCharacters={topCharacters}
    />
  );
}