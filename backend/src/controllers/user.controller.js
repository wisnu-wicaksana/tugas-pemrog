const userService = require('../repositories/user.repository');

const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // sudah didekode dari JWT
    const user = await userService.getUserById(userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isMember: user.isMember,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getMe };
