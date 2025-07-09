const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const paymentRoutes = require('./routes/payment.route');
const webhookRoutes = require('./routes/webhook.route');
const paymentSuccessRoute = require('./routes/payment-success.route');
const userRoutes = require('./routes/user.routes');

const app = express();

// ✅ CORS untuk frontend
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

// ✅ Raw body khusus untuk webhook
app.use('/api/webhook/payment', bodyParser.raw({ type: '*/*' }));

// ✅ JSON parser untuk route lain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoutes); // berisi: /payment
app.use('/api', paymentSuccessRoute);

app.get("/api", (req, res) => {
  res.json({ message: "API Server is Running!" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
