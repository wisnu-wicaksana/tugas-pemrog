const prisma = require('../config/db');

const findFavorite = (userId, malId) => {
  return prisma.favorite.findUnique({
    where: {
      userId_malId: {
        userId,
        malId,
      },
    },
  });
};

const addFavorite = ({ userId, malId, title, imageUrl }) => {
  return prisma.favorite.create({
    data: {
      userId,
      malId,
      title,
      imageUrl,
    },
  });
};

const getUserFavorites = (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

const removeFavorite = (userId, malId) => {
  return prisma.favorite.delete({
    where: {
      userId_malId: {
        userId,
        malId,
      },
    },
  });
};

module.exports = {
  findFavorite,
  addFavorite,
  getUserFavorites,
  removeFavorite,
};
