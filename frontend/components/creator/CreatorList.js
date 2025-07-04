'use client';

import CreatorCard from './CreatorCard';

export default function CreatorList({ creators }) {
  if (!creators || creators.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada data creator.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {creators.map((creator) => (
        <CreatorCard key={creator.mal_id} creator={creator} />
      ))}
    </div>
  );
}
