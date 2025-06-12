require('dotenv').config();

module.exports = {
  apiKey: process.env.TRIPAY_API_KEY,
  privateKey: process.env.TRIPAY_PRIVATE_KEY,
  merchantCode: process.env.TRIPAY_MERCHANT_CODE,
  apiUrl: process.env.TRIPAY_API_URL,
  callbackUrl: process.env.TRIPAY_CALLBACK_URL,
  returnUrl: process.env.TRIPAY_RETURN_URL,
};

