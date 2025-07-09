const crypto = require('crypto');
const { updatePaymentStatus } = require('../services/payment.service');
const tripayConfig = require('../config/tripay');

// 🔐 Validasi Signature
function isValidSignature(req) {
  const callbackSignature = req.headers['x-callback-signature'];
  const computedSignature = crypto
    .createHmac('sha256', tripayConfig.privateKey)
    .update(req.body) // raw body, bukan stringify
    .digest('hex');

  return callbackSignature === computedSignature;
}

async function handleWebhook(req, res) {
  try {
    
    const payload = req.body;

    console.log("Webhook diterima:", payload);

    if (!payload.merchant_ref || !payload.status) {
      return res.status(400).json({ message: 'Payload tidak lengkap' });
    }

    if (!isValidSignature(req)) {
      console.warn("❌ Signature tidak valid");
      return res.status(403).json({ message: 'Signature tidak valid' });
    }

    console.log("✅ Signature valid. Update status untuk:", payload.merchant_ref);

    await updatePaymentStatus(payload);

    return res.status(200).json({ message: 'Webhook diterima dan diproses' });

  } catch (error) {
    console.error("Gagal memproses webhook:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { handleWebhook };
