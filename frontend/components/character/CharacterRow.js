// file: frontend/components/character/CharacterRow.js
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';
import apiClient from '@/lib/apiClient';

const CharacterRow = ({ character, rank, isFavorited, onFavoriteChange }) => {
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
    <div className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="w-10 text-center text-gray-400 font-bold text-lg">{rank}</div>
      <div className="relative w-12 h-16 rounded-md overflow-hidden ml-4 flex-shrink-0">
        <Image
          src={character.images?.webp?.image_url || character.images?.jpg?.image_url}
          alt={`Picture of ${character.name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="5vw"
        />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <Link
          href={`/detail/character/${character.mal_id}`}
          className="font-bold text-white truncate hover:underline"
        >
          {character.name}
        </Link>
        <p className="text-sm text-gray-400">{character.favorites.toLocaleString()} favorites</p>
      </div>
      <button
        onClick={handleFavoriteClick}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-4"
        title={isFavorited ? "Hapus dari Favorit" : "Tambah ke Favorit"}
      >
        <HeartIcon className={`w-6 h-6 ${isFavorited ? 'text-red-500' : ''}`} />
      </button>
    </div>
  );
};

export default CharacterRow;