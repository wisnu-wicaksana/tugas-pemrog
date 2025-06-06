const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isMember } = require('../middlewares/isMember.middleware');

router.post('/', protect, isMember, favoriteController.addFavorite);
router.get('/', protect, favoriteController.getFavorites);
router.delete('/:malId', protect, isMember, favoriteController.deleteFavorite);

module.exports = router;
   