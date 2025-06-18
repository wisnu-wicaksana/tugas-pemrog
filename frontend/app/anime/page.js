// frontend/app/anime/page.js
import { getApi } from "@/lib/jikan";
import AnimeList from "@/components/anime /AnimeList";

export const metadata = {
  title: "Top Anime",
};

export default async function AnimePage() {
  let topAnime = [];

  try {
    const response = await getApi("top/anime", "limit=13");
    topAnime = response.data;
  } catch (error) {
    return (
      <div className="text-red-500 p-4">
        Gagal memuat data: {error.message}
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Anime</h1>
      <AnimeList data={topAnime} />
    </main>
  );
}
