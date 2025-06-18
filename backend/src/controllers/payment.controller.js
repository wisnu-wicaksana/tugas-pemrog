const paymentService = require('../services/payment.service');

async function createPayment(req, res) {
  try {
    const userId = req.user.id; 
    const { amount, paymentMethod } = req.body;

    const transaction = await paymentService.createTripayTransaction({ userId, amount, paymentMethod });

    res.json({
      message: 'Payment transaction created',
      paymentUrl: transaction.checkout_url
    });
  } catch (error) {
    console.error('Error in createPayment:', error);
    res.status(400).json({ message: error.message });
  }
}



module.exports = { createPayment };
