import { PrismaClient, Transaction } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

async function seed() {
  const promises = data.map((transaction: Transaction) =>
    prisma.transaction.create({
      data: transaction,
    }),
  );

  return await Promise.all(promises);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
