// file: frontend/components/anime/AnimeList.js
import AnimeCard from "./AnimeCard";

export default function AnimeList({ anime = [], favorites = [], onFavoriteChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {anime.map((a) => {
        const isFavorited = favorites.some(fav => fav.malId === a.mal_id);
        
        return (
          <AnimeCard
            key={a.mal_id}
            anime={a}
            isFavorited={isFavorited}
            onFavoriteChange={onFavoriteChange} // Teruskan fungsi ini ke setiap kartu
          />
        );
      })}
    </div>
  );
}