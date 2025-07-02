const { PrismaClient } = require('@prisma/client');

// Cek jika sudah ada instance prisma di global object, jika tidak, buat baru.
const prisma = global.prisma || new PrismaClient();

// Di lingkungan development, simpan instance yang baru dibuat ke global object.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;