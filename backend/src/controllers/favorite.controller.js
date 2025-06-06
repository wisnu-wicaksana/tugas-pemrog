const favoriteService = require('../services/favorite.service');

const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { malId, title, imageUrl } = req.body;

  try {
    const favorite = await favoriteService.addToFavorite({ userId, malId, title, imageUrl });
    res.status(201).json({ message: 'Berhasil ditambahkan ke favorit', favorite });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await favoriteService.listFavorites(userId);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data favorit' });
  }
};

const deleteFavorite = async (req, res) => {
  const userId = req.user.id;
  const malId = parseInt(req.params.malId);

  try {
    await favoriteService.deleteFavorite(userId, malId);
    res.json({ message: 'Berhasil dihapus dari favorit' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
};
