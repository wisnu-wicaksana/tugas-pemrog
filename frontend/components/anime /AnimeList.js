import AnimeCard from './AnimeCard';

export default function AnimeList({ anime, showAdd = false, showUnfavorite = false, onRemove })
 {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {anime.map((a) => (
       <AnimeCard
  key={a.malId}
  anime={a}
  showAdd={showAdd}
  showUnfavorite={showUnfavorite}
  onRemove={onRemove}
/>

      ))}
    </div>
  );
}

