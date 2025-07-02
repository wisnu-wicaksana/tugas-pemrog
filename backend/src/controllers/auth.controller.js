const generateToken = require('../utils/generateToken');

const googleLogin = (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  
 res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);

};

module.exports = { googleLogin };
