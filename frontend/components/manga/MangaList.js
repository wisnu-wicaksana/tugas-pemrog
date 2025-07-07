// file: frontend/components/manga/MangaList.js
import MangaCard from "./MangaCard";

// Komponen ini sekarang menerima 'favorites' dan 'onFavoriteChange'
export default function MangaList({ manga = [], favorites = [], onFavoriteChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {manga.map((item) => {
        // Lakukan pengecekan favorit di sini
        const isFavorited = favorites.some(fav => fav.malId === item.mal_id);
        
        return (
          <MangaCard
            key={item.mal_id}
            manga={item}
            isFavorited={isFavorited} // Kirim status yang benar ke kartu
            onFavoriteChange={onFavoriteChange}
          />
        );
      })}
    </div>
  );
}