'use client';
import { useEffect, useState } from 'react';
import CharacterList from '@/components/character/CharacterList';
import { getApi } from '@/lib/jikan';

export default function Character() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi('top/characters', 'limit=10')
      .then((res) => {
        setCharacters(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-4">
     

      <h1 className="text-2xl font-bold mb-4">Top Characters (Preview)</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <CharacterList characters={characters} />
      )}

      <div className="mt-6 text-center">
        <a
          href="/allTopCharacter"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lihat Semua Karakter
        </a>
      </div>
    </main>
  );
}
