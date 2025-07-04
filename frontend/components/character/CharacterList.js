'use client';
import CharacterCard from './CharacterCard';

export default function CharacterList({ characters }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {characters.map((char) => (
        <CharacterCard key={char.mal_id} character={char} />
      ))}
    </div>
  );
}
