'use client';

import Image from 'next/image';

export default function MangaCard({ manga }) {
  const imageUrl = manga.images?.webp?.image_url || manga.images?.jpg?.image_url;
  const title = manga.title;

  return (
    <div className="bg-white rounded shadow hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-2">
        <h2 className="text-sm font-semibold line-clamp-2">{title}</h2>
      </div>
    </div>
  );
}
