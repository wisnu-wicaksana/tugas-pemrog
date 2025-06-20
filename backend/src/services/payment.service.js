const crypto = require('crypto');
const paymentRepo = require('../repositories/payment.repository');
const userRepo = require('../repositories/user.repository');
const tripayConfig = require('../config/tripay');

const {
  apiKey,
  privateKey,
  merchantCode,
  apiUrl,
  callbackUrl,
  returnUrl
} = tripayConfig;

async function createTripayTransaction({ userId, amount, paymentMethod }) {
  // Validasi user
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('User tidak ditemukan');

  // Cegah user membayar dua kali
  const existingPayment = await paymentRepo.findActivePaymentByUser(userId);
  if (existingPayment) throw new Error('User sudah memiliki transaksi aktif');

  const merchantRef = `INV-${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', privateKey)
    .update(`${merchantCode}${merchantRef}${amount}`)
    .digest('hex');

  const body = {
    method: paymentMethod,
    merchant_ref: merchantRef,
    amount,
    customer_name: user.name || 'Customer',
    customer_email: user.email,
    order_items: [
      {
        sku: 'MEMBERSHIP001',
        name: 'Biaya Member',
        price: amount,
        quantity: 1
      }
    ],
    callback_url: callbackUrl,
    return_url: returnUrl,
    signature
  };

  // Gunakan fetch bawaan Node.js
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Gagal membuat transaksi');
  }

  // Simpan pembayaran ke database
  await paymentRepo.createPayment({
    userId,
    reference: data.data.reference,
    amount,
    status: 'UNPAID',
    merchantRef,
    paymentMethod
  });

  return data.data; // Kembalikan detail transaksi (payment_url, dll.)
}

async function updatePaymentStatus(payload) {
  const { merchant_ref, status } = payload;

  const payment = await paymentRepo.findPaymentByMerchantRef(merchant_ref);
  if (!payment) throw new Error('Pembayaran tidak ditemukan');

  if (payment.status === status) return; // Tidak perlu update jika sama

  // Update status pembayaran
  await paymentRepo.updatePaymentStatus(merchant_ref, status);

  // Update user isMember jika pembayaran berhasil
  if (status === 'PAID') {
    await userRepo.updateIsMember(payment.userId, true);
  }
}

module.exports = {
  createTripayTransaction,
  updatePaymentStatus
};


