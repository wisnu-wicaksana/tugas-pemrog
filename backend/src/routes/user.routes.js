const express = require('express');
const { getMe } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', protect, getMe);

module.exports = router;
