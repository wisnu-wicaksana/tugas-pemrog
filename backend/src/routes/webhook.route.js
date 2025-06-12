const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

router.post('/payment', webhookController.handleWebhook);

module.exports = router;
