'use client';
import Image from 'next/image';

export default function CharacterCard({ character }) {
  return (
    <div className="bg-white shadow p-2 rounded w-48">
      <Image
        src={character.images?.jpg?.image_url}
        alt={character.name}
        width={192}
        height={256}
        className="w-full h-64 object-cover rounded"
      />
      <p className="mt-2 font-semibold text-sm text-center">{character.name}</p>
      {character.name_kanji && (
        <p className="text-xs text-center text-gray-500">{character.name_kanji}</p>
      )}
    </div>
  );
}
