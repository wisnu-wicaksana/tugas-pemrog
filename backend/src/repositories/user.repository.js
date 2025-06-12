const prisma = require('../config/db');

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function updateIsMember(userId, isMember) {
  return prisma.user.update({
    where: { id: userId },
    data: { isMember }
  });
}

module.exports = {
  findUserById,
  updateIsMember
};
