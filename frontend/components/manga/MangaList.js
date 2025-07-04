'use client';

import MangaCard from './MangaCard';

export default function MangaList({ manga }) {
  if (!manga || manga.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada data manga.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {manga.map((item) => (
        <MangaCard key={item.mal_id} manga={item} />
      ))}
    </div>
  );
}
