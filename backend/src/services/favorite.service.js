const prisma = require('../config/db'); 

const findFavorite = (userId, malId) => {
  return prisma.favorite.findUnique({
    where: {
      userId_malId: { userId, malId },
    },
  });
};

const addToFavorite = ({ userId, malId, title, imageUrl, year, score }) => {
  return prisma.favorite.create({
    data: { userId, malId, title, imageUrl, year,score },
  });
};

const listFavorites = (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

const deleteFavorite = (userId, malId) => {
  return prisma.favorite.delete({
    where: {
      userId_malId: { userId, malId },
    },
  });
};

module.exports = {
  findFavorite,
  addToFavorite,
  listFavorites,
  deleteFavorite,
};
