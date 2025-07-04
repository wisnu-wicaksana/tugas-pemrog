'use client';

import Image from 'next/image';

export default function CreatorCard({ creator }) {
  const imageUrl = creator.images?.jpg?.image_url;
  const name = creator.name;

  return (
    <div className="bg-white rounded shadow hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-t"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-2">
        <h2 className="text-sm font-semibold line-clamp-2">{name}</h2>
      </div>
    </div>
  );
}
