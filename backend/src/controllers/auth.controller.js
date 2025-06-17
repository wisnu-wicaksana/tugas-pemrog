const generateToken = require('../utils/generateToken');

const googleLogin = (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  
  res.redirect(`http://localhost:3000/auth/success?token=${token}`);
};

module.exports = { googleLogin };
