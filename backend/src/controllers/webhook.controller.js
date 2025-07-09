const crypto = require('crypto');
const { updatePaymentStatus } = require('../services/payment.service');
const tripayConfig = require('../config/tripay');

// 🔒 Fungsi untuk verifikasi signature dari Tripay
function isValidSignature(req) {
  const callbackSignature = req.headers['x-callback-signature'];
  const computedSignature = crypto
    .createHmac('sha256', tripayConfig.privateKey)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return callbackSignature === computedSignature;
}

async function handleWebhook(req, res) {
  try {
    const payload = req.body;
    console.log("Webhook diterima:", payload);

    // ❗ Validasi isi payload
    if (!payload.merchant_ref || !payload.status) {
      return res.status(400).json({ message: 'Payload tidak lengkap' });
    }

    // ✅ Validasi signature Tripay
    if (!isValidSignature(req)) {
      console.warn("Signature tidak valid");
      return res.status(403).json({ message: 'Signature tidak valid' });
    }

    console.log("Signature valid. Memproses update status untuk:", payload.merchant_ref);

    await updatePaymentStatus(payload);

    console.log("Status pembayaran berhasil diperbarui");

    // ✅ Harus mengirim respons 200 + JSON agar Tripay mencatat IPN SUKSES
    return res.status(200).json({ message: 'Webhook diterima dan diproses' });

  } catch (error) {
    console.error("Gagal memproses webhook:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { handleWebhook };
