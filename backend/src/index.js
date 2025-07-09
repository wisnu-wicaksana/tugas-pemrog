const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
require('./config/passport');

const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const paymentRoutes = require('./routes/payment.route');
const webhookRoutes = require('./routes/webhook.route');
const paymentSuccessRoute = require('./routes/payment-success.route');
const userRoutes = require('./routes/user.routes');

const app = express();
dotenv.config();

app.use(cors({
  origin: process.env.FRONTEND_URL, // contoh: https://tugas-pemrog.vercel.app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // jika pakai cookie, session, atau token yang butuh cross-origin
}));


// Raw body khusus untuk webhook Tripay
app.use('/api/webhook/payment', bodyParser.raw({ type: '*/*' }));

//  Middleware umum untuk endpoint lainnya
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routing
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoutes); 
app.use('/api', paymentSuccessRoute);

app.get("/api", (req, res) => {
  res.json({ message: "HELLO WORLD - API Server is Running!" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
