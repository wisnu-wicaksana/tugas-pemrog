// file: frontend/components/character/CharacterList.js
import CharacterCard from "./CharacterCard";

// Komponen ini juga sekarang menerima 'favorites' dan 'onFavoriteChange'
export default function CharacterList({ characters = [], favorites = [], onFavoriteChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {characters.map((item) => {
        // Lakukan pengecekan favorit di sini
        const isFavorited = favorites.some(fav => fav.malId === item.mal_id);

        return (
          <CharacterCard
            key={item.mal_id}
            character={item}
            isFavorited={isFavorited} // Kirim status yang benar ke kartu
            onFavoriteChange={onFavoriteChange}
          />
        );
      })}
    </div>
  );
}