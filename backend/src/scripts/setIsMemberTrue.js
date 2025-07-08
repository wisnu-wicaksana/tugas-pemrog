
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  
  const result = await prisma.user.updateMany({
    data: {
      isMember: true,
    },
  });

  console.log(`Berhasil update ${result.count} user menjadi member.`);
}

main()
  .catch((e) => {
    console.error('Error saat update isMember:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
