const { updatePaymentStatus } = require('../services/payment.service');

async function handleWebhook(req, res) {
  try {
    const payload = req.body;
    console.log("Webhook diterima:", payload);

    if (!payload.merchant_ref || !payload.status) {
      return res.status(400).json({ message: 'Payload tidak lengkap' });
    }

    // Tambahkan log sebelum update
    console.log("Memproses update status untuk:", payload.merchant_ref);

    await updatePaymentStatus(payload);

    console.log("Status pembayaran berhasil diperbarui");

    res.status(200).json({ message: 'Webhook diterima dan diproses' });
  } catch (error) {
    
    console.error("Gagal memproses webhook:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { handleWebhook };
