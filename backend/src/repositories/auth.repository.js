const prisma = require('../config/db');

const findUserByGoogleId = async (googleId) => {
  return prisma.user.findUnique({ where: { googleId } });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

module.exports = {
  findUserByGoogleId,
  findUserByEmail,
  createUser,
};
