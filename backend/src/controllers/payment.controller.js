const paymentService = require('../services/payment.service');

async function createPayment(req, res) {
  try {
    const { userId, amount, paymentMethod } = req.body;

    const transaction = await paymentService.createTripayTransaction({ userId, amount, paymentMethod });
    console.log('Transaction result:', transaction);

    res.json({
      message: 'Payment transaction created',
      paymentUrl: transaction.checkout_url
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
 
}


module.exports = { createPayment };
