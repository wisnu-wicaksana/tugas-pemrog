// file: frontend/lib/apiClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Buat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  // baseURL akan mengambil URL API dari file .env.local Anda
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Ini adalah bagian paling kuat: Interceptor
// Kode ini akan "mencegat" setiap permintaan SEBELUM dikirim
apiClient.interceptors.request.use(
  (config) => {
    // 1. Baca token dari cookie
    const token = Cookies.get('token');

    // 2. Jika token ada, tambahkan ke header Authorization secara otomatis
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Kembalikan konfigurasi yang sudah dimodifikasi untuk dilanjutkan
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika terjadi error pada konfigurasi request
    return Promise.reject(error);
  }
);

export default apiClient;