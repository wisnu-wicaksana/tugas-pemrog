const userService = require('../repositories/user.repository');

const getMe = async (req, res) => {
  try {
    console.log('🔍 req.user:', req.user); // Tambahkan ini

    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: 'Token tidak valid' });

    const user = await userService.getUserById(userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isMember: user.isMember,
    });
  } catch (err) {
    console.error(' Error getMe:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getMe };
