'use client';
import Image from 'next/image';
import { apiClient } from '@/lib/apiClient';

export default function AnimeCard({ anime, showAdd = false, showUnfavorite = false, onRemove }) {
  const handleAddFavorite = async () => {
    const token = localStorage.getItem('token');
    try {
      await apiClient('POST', '/favorites', {
        malId: anime.mal_id,
        title: anime.title,
        imageUrl: anime.images.jpg.image_url,
      }, token);
      alert('Ditambahkan ke favorit!');
    } catch (err) {
      alert('Gagal menambahkan ke favorit.');
    }
  };

  const handleRemoveFavorite = async () => {
    const token = localStorage.getItem('token');
    try {
      await apiClient('DELETE', `/favorites/${anime.malId}`, null, token);
      onRemove?.(anime.malId); 
    } catch (err) {
      alert('Gagal menghapus dari favorit.');
    }
  };

  return (
    <>
     <div className="bg-white shadow p-2 rounded w-48">
      <Image
        src={anime.imageUrl || anime.images?.jpg?.image_url}
        alt={anime.title}
        width={192}
        height={256}
        className="w-full h-64 object-cover rounded"
      />
      <p className="mt-2 font-semibold text-sm text-center">{anime.title}</p>
      {showAdd && (
        <button onClick={handleAddFavorite} className="text-blue-600 underline text-sm">
          Tambah ke Favorit
        </button>
      )}
      {showUnfavorite && (
        <button onClick={handleRemoveFavorite} className="text-red-600 underline text-sm">
          Hapus dari Favorit
        </button>
      )}
    </div>
    
   
    </>
   
  );
}
