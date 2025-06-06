const isMember = (req, res, next) => {
  if (!req.user?.isMember) {
    return res.status(403).json({
      message: 'Fitur ini hanya untuk member. Silakan upgrade akun Anda.',
    });
  }
  next();
};

module.exports = { isMember };
