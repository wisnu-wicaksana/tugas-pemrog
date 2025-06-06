const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id,
      isMember: user.isMember,  
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
