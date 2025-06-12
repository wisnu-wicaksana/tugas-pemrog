const prisma = require('../config/db');

async function createPayment(data) {
  return prisma.payment.create({ data });
}

async function findPaymentByMerchantRef(merchantRef) {
  return prisma.payment.findUnique({ where: { merchantRef } });
}


async function updatePaymentStatus(merchantRef, status) {
  return prisma.payment.update({
    where: { merchantRef }, 
    data: { status, updatedAt: new Date() }
  });
}


async function findActivePaymentByUser(userId) {
  return prisma.payment.findFirst({
    where: {
      userId,
      status: { in: ['UNPAID', 'PAID'] }
    }
  });
}

module.exports = {
  createPayment,
  findPaymentByMerchantRef,
  updatePaymentStatus,
  findActivePaymentByUser
};
