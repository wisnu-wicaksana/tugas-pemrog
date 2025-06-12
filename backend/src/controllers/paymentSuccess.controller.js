const { findPaymentByMerchantRef } = require('../repositories/payment.repository');

async function checkPaymentStatus(req, res) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).send(' Parameter "reference" tidak ditemukan.');
  }

  try {
    const payment = await findPaymentByMerchantRef(reference);

    if (!payment) {
      return res.status(404).send(' Transaksi tidak ditemukan.');
    }

    if (payment.status === 'PAID') {
      return res.send(' Pembayaran berhasil! Terima kasih.');
    } else {
      return res.send(' Pembayaran belum diterima. Silakan cek kembali atau hubungi admin.');
    }
  } catch (error) {
    console.error('Gagal memeriksa status pembayaran:', error);
    return res.status(500).send(' Terjadi kesalahan saat memeriksa status pembayaran.');
  }
}

module.exports = { checkPaymentStatus };
