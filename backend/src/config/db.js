// File: backend/src/config/db.js

// ✅ PATH YANG BENAR
const { PrismaClient } = require('../../prisma/generated/prisma');

const prisma = new PrismaClient();

module.exports = prisma;