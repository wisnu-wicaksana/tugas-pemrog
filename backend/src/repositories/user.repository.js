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

const getUserById = async (id) => {
  console.log('ID yang diterima getUserById:', id);
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      email: true,
      isMember: true,
    },
  });
};



module.exports = {
  findUserById,
  updateIsMember,
  getUserById
};
