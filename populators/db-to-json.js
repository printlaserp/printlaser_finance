const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

const tables = [
  "Incomings",
  "Expenses",
  "Categories",
  "Subcategories",
  "PaymentMethods",
  "Accounts",
  "Users",
  "Transferences",
  "Fees",
  // "BalancePerDay",
  // "DailySummaries",
];

async function exportData() {
  for (const table of tables) {
    try {
      const records = await prisma[table].findMany();

      const jsonData = JSON.stringify(records, null, 2);

      const filePath = path.join(__dirname, 'exportedData', `${table}.json`);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, jsonData, { flag: 'w' });

      console.log(`Dados exportados da tabela ${table}`);
    } catch (error) {
      console.error(`Erro ao exportar dados da tabela ${table}:`, error);
    }
  }

  await prisma.$disconnect();
}

exportData();
