const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/create', protect, paymentController.createPayment);

module.exports = router;
