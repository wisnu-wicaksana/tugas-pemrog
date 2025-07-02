const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require('./config/passport'); // Pastikan path ini benar dari root backend

// Impor semua rute Anda
const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const paymentRoutes = require('./routes/payment.route');
const webhookRoutes = require('./routes/webhook.route');
const paymentSuccessRoute = require('./routes/payment-success.route');
const userRoutes = require('./routes/user.routes');

const app = express();
dotenv.config();


app.use(cors({
  origin: process.env.FRONTEND_URL
}));

// Middleware standar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute dasar untuk mengecek apakah API aktif
app.get("/api", (req, res) => {
  res.json({ message: "HELLO WORLD - API Server is Running!" });
});

app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'AUTH ROUTE AKTIF ✅' });
});

console.log("Auth routes loaded ✅");
app.use('/api/auth', authRoutes);

// Gunakan semua rute Anda
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api', paymentSuccessRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});


module.exports = app;