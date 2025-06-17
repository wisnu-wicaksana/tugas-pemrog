const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")  
require('./config/passport'); 

const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const paymentRoutes = require('./routes/payment.route');
const webhookRoutes = require('./routes/webhook.route');
const paymentSuccessRoute = require('./routes/payment-success.route');
const userRoutes = require('./routes/user.routes');

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/api", (req, res) => {
  res.json({ message: "HELLO WORLD" });
});



app.use('/auth', authRoutes);
app.use("/favorites", favoriteRoutes);
app.use('/payment', paymentRoutes);
app.use('/webhook', webhookRoutes);
app.use(paymentSuccessRoute);
app.use('/user', userRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`runing in port ${PORT}`);
});


