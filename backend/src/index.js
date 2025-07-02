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

// Gunakan semua rute Anda
app.use('/auth', authRoutes);
app.use("/favorites", favoriteRoutes);
app.use('/payment', paymentRoutes);
app.use('/webhook', webhookRoutes);
app.use(paymentSuccessRoute);
app.use('/user', userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});


module.exports = app;