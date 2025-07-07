// file: frontend/components/character/CharacterCard.js
import Image from 'next/image';
import Link from 'next/link';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';

const CharacterCard = ({ character, isFavorited, onFavoriteChange }) => {
  const handleFavoriteClick = async (event) => {
    event.preventDefault();

    if (isFavorited) {
      try {
        await apiClient.delete(`/favorites/${character.mal_id}`);
        toast.custom((t) => <CustomToast t={t} type="delete" title="Berhasil Dihapus" message={`"${character.name}" telah dihapus.`} />);
        if (onFavoriteChange) onFavoriteChange();
      } catch (error) {
        toast.custom((t) => <CustomToast t={t} type="error" title="Gagal Menghapus" message={error.response?.data?.message || 'Terjadi kesalahan.'} />);
      }
    } else {
      try {
        await apiClient.post('/favorites', {
          malId: character.mal_id,
          title: character.name, // Karakter menggunakan 'name' sebagai judul
          imageUrl: character.images?.webp?.image_url,
          score: character.favorites, // Kita bisa gunakan jumlah favorit sebagai 'score'
          type: 'CHARACTER', // Menambahkan tipe data
        });
        toast.custom((t) => <CustomToast t={t} type="success" title="Berhasil Ditambahkan" message={`"${character.name}" telah ditambahkan.`} />);
        if (onFavoriteChange) onFavoriteChange();
      } catch (error) {
        toast.custom((t) => <CustomToast t={t} type="error" title="Gagal Menambahkan" message={error.response?.data?.message || 'Terjadi kesalahan.'} />);
      }
    }
  };

  return (
    <Link href={character.url} target="_blank" rel="noopener noreferrer" className="group block bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-1">
      <div className="relative w-full aspect-[2/3]">
        <Image src={character.images?.webp?.image_url || character.images?.jpg?.image_url} alt={`Picture of ${character.name}`} fill style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
         <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full backdrop-blur-sm 
                     transition-all duration-300 transform hover:scale-110"
          title={isFavorited ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 transition-all duration-200 ease-in-out
                       ${isFavorited 
                         ? 'text-red-500' 
                         : 'text-white/80 hover:text-white drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.7)]'
                       }`}
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="p-3 text-center">
        <h3 className="text-white font-bold text-sm h-10 flex items-center justify-center">{character.name}</h3>
        <p className="text-xs text-gray-400">{character.favorites.toLocaleString()} Favorites</p>
      </div>
    </Link>
  );
};

export default CharacterCard;