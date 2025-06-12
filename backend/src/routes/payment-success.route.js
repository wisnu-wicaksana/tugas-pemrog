const express = require('express');
const router = express.Router();
const { checkPaymentStatus } = require('../controllers/paymentSuccess.controller');

router.get('/payment-success', checkPaymentStatus);

module.exports = router;
