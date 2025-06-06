const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")  
require('./config/passport'); 

const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorite.routes');

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("HELLO WORLD");
});




app.use('/auth', authRoutes);
app.use("/favorites", favoriteRoutes);



// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`runing in port ${PORT}`);
});


