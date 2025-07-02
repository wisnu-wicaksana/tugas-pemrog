const generateToken = require('../utils/generateToken');

const googleLogin = (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  
  res.redirect(`https://tugas-pemrog.vercel.app/auth/success?token=${token}`);
};

module.exports = { googleLogin };
