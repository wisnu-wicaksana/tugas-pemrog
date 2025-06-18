'use client';
import Image from 'next/image';

export default function AnimeCard({ anime }) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <Image 
        src={anime.images.jpg.image_url}
        alt={anime.title}
        width={200}
        height={300}
        className="rounded mb-2"
      />
      <h3 className="font-bold text-lg">{anime.title}</h3>
    </div>
  );
}

