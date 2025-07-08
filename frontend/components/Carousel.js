// file: frontend/components/Carousel.js
import Link from 'next/link';
import AnimeCard from './anime/AnimeCard';

const Carousel = ({ title, items = [], favorites, onFavoriteChange, linkTo = "/" }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <Link href={linkTo} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          Lihat Semua
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {items.map(item => {
          // Cek apakah item ini ada di daftar favorit
          const isFavorited = favorites.some(fav => fav.malId === item.mal_id);
          return (
            // Kita bungkus setiap kartu agar ukurannya konsisten di dalam carousel
            <div key={item.mal_id} className="w-40 sm:w-44 flex-shrink-0">
              <AnimeCard
                anime={item}
                isFavorited={isFavorited}
                onAddFavorite={() => onFavoriteChange(item, true)}
                onRemoveFavorite={() => onFavoriteChange(item, false)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;