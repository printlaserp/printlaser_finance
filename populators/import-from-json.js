const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

const tables = [
    "Categories",
    "Subcategories",
    "PaymentMethods",
    "Accounts",
    "Users",
    "Transferences",
    "Fees",
    "Incomings",
    "Expenses",
    //   "BalancePerDay",
    //   "DailySummaries",
];

async function importData() {
    for (const table of tables) {
        try {
            const filePath = path.join(__dirname, 'exportedData', `${table}.json`);
            const jsonData = await fs.readFile(filePath, 'utf-8');
            const records = JSON.parse(jsonData);

            for (const record of records) {
                await prisma[table].create({
                    data: record,
                });
            }

            console.log(`Dados importados para a tabela ${table}`);
        } catch (error) {
            console.error(`Erro ao importar dados para a tabela ${table}:`, error);
        }
    }

    await prisma.$disconnect();
}

importData();
