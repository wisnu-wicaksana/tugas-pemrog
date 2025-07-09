// file: backend/src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository'); // 1. Impor repository user

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Tidak ada token.' });
  }
   
  try {
    // Verifikasi token untuk mendapatkan payload (yang berisi id pengguna)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ▼▼▼ INI PERUBAHAN KUNCINYA ▼▼▼
    // 2. Gunakan ID dari token untuk mengambil data pengguna TERBARU dari database
    const freshUser = await userRepo.findUserById(decoded.id);

    if (!freshUser) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // 3. Tempelkan data pengguna yang BARU ke req.user
    req.user = freshUser;
    
    next(); // Lanjutkan ke proses selanjutnya (misalnya, addFavorite)
  } catch {
    res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa.' });
  }
};

// Middleware isMember sekarang akan bekerja dengan benar karena req.user sudah fresh
const isMember = (req, res, next) => {
    // req.user di sini sudah berisi data terbaru dari database
    if (req.user && req.user.isMember) {
        next(); // Jika member, izinkan lanjut
    } else {
        res.status(403).json({ message: 'Fitur ini hanya untuk member. Silakan upgrade akun Anda.' });
    }
};

module.exports = { 
  protect,
  isMember 
};