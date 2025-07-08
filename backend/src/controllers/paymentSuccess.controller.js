const { findPaymentByMerchantRef } = require('../repositories/payment.repository');

async function checkPaymentStatus(req, res) {
  const { tripay_merchant_ref } = req.query;

  if (!tripay_merchant_ref) {
    
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=success`);
    
  }

  try {
    const payment = await findPaymentByMerchantRef(tripay_merchant_ref);

    if (!payment) {
      //return res.redirect('http://localhost:3000/dashboard?status=notfound');
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=notfound`);
    }

    if (payment.status === 'PAID') {
      //return res.redirect('http://localhost:3000/dashboard?status=success');
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=success`);
    } else {
      //return res.redirect('http://localhost:3000/dashboard?status=pending');
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=pending`);
    }
  } catch (error) {
    console.error('Gagal memeriksa status pembayaran:', error);
    //return res.redirect('http://localhost:3000/dashboard?status=error');
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=error`);
  }
}

module.exports = { checkPaymentStatus };
