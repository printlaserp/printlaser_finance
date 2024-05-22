const { PrismaClient: PrismaMySQLClient } = require('@prisma/client');
const { PrismaClient: PrismaSQLiteClient } = require('../prisma/sqlite/client');

async function copyData() {
  const prismaMySQL = new PrismaMySQLClient();
  const prismaSQLite = new PrismaSQLiteClient();

  const mysqlTables = await prismaMySQL.$queryRaw(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'nome_do_seu_banco_mysql';"
  );

  for (const { table_name } of mysqlTables) {
    const data = await prismaMySQL[table_name].findMany();
    await prismaSQLite.$executeRaw`PRAGMA foreign_keys=OFF;`;

    for (const row of data) {
      await prismaSQLite[table_name].create({ data: row });
    }

    await prismaSQLite.$executeRaw`PRAGMA foreign_keys=ON;`;
  }

  await prismaMySQL.$disconnect();
  await prismaSQLite.$disconnect();
}

copyData().catch((e) => {
  throw e;
});
