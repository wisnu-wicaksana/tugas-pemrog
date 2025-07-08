// file: frontend/components/manga/MangaCard.js
import Image from 'next/image';
import Link from 'next/link';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';

const MangaCard = ({ manga, isFavorited, onFavoriteChange }) => {
  const handleFavoriteClick = async (event) => {
    event.preventDefault();

    if (isFavorited) {
      // Logika Unfavorite
      try {
        await apiClient.delete(`/favorites/${manga.mal_id}`);
        toast.custom((t) => <CustomToast t={t} type="delete" title="Berhasil Dihapus" message={`"${manga.title}" telah dihapus.`} />);
        if (onFavoriteChange) onFavoriteChange();
      } catch (error) {
        toast.custom((t) => <CustomToast t={t} type="error" title="Gagal Menghapus" message={error.response?.data?.message || 'Terjadi kesalahan.'} />);
      }
    } else {
      // Logika Add Favorite
      try {
        await apiClient.post('/favorites', {
          malId: manga.mal_id,
          title: manga.title,
          imageUrl: manga.images?.webp?.large_image_url,
          score: manga.score,
          year : manga.year,
          type: 'MANGA', // Menambahkan tipe data
        });
        toast.custom((t) => <CustomToast t={t} type="success" title="Berhasil Ditambahkan" message={`"${manga.title}" telah ditambahkan.`} />);
        if (onFavoriteChange) onFavoriteChange();
      } catch (error) {
        toast.custom((t) => <CustomToast t={t} type="error" title="Gagal Menambahkan" message={error.response?.data?.message || 'Terjadi kesalahan.'} />);
      }
    }
  };

  return (
    <Link href={`/detail/manga/${manga.mal_id}`} className="group block bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-1">
      <div className="relative w-full aspect-[2/3]">
        <Image src={manga.images?.webp?.large_image_url || manga.images?.jpg?.large_image_url} alt={`Cover of ${manga.title}`} fill style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
        <button onClick={handleFavoriteClick} className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110" title={isFavorited ? "Hapus dari Favorit" : "Tambah ke Favorit"}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-200 ease-in-out ${isFavorited ? 'text-red-500' : 'text-white/80 hover:text-white drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.7)]'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-md mb-2" style={{ height: '3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{manga.title}</h3>
        <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-gray-700/50">
          <p className="flex items-center font-semibold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>{manga.score || 'N/A'}</p>
          <p className="font-semibold">{manga.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;