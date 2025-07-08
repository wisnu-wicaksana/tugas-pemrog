// file: frontend/components/character/CharacterList.js
import CharacterRow from "./CharacterRow";

const CharacterList = ({ characters = [], favorites = [], onFavoriteChange }) => {
  return (
    <div className="space-y-3">
      {characters.map((item, index) => {
        const isFavorited = favorites.some(fav => fav.malId === item.mal_id);
        return (
          <CharacterRow
            key={item.mal_id}
            character={item}
            rank={index + 1} // Menambahkan peringkat berdasarkan urutan
            isFavorited={isFavorited}
            onFavoriteChange={onFavoriteChange}
          />
        );
      })}
    </div>
  );
};

export default CharacterList;