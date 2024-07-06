const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const accounts = [
    {
        label: "PrintLaser (Especie)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: true,
        type: "specie",
    },
    {
        label: "PrintLaser (Cora)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "Assistencia Tecnica (Especie)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "Assistencia Tecnica (Mercado Pago)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "LojaPereira (Especie)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "LojaPereira (C6)",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "Cofre",
        logo_url: "http://example.com/logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Caixa",
        color: "#FF5733",
        is_card_account: false,
        is_default: f,
        type: "specie",
    },
    {
        label: "Maquineta Infinity",
        logo_url: "http://example.com/savings_logo.png",
        balance: 0,
        initial_balance: 0,
        description: "Maquineta",
        color: "#33FF57",
        is_card_account: true,
        is_default: false,
        type: "digital",
    },
    // Add more accounts as needed
];

(async () => {
    try {
        for (const account of accounts) {
            const existingAccount = await prisma.accounts.findFirst({
                where: {
                    label: account.label
                }
            });

            if (!existingAccount) {
                const createdAccount = await prisma.accounts.create({
                    data: {
                        label: account.label,
                        logo_url: account.logo_url,
                        balance: account.balance,
                        initial_balance: account.initial_balance,
                        description: account.description,
                        color: account.color,
                        is_card_account: account.is_card_account,
                        is_default: account.is_default,
                        type: account.type,
                        access_level: account.access_level,
                        active: account.active
                    }
                });
                console.log(`Created account: ${createdAccount.label}`);
            } else {
                console.log(`Account already exists: ${existingAccount.label}`);
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(err);
    } finally {
        await prisma.$disconnect();
    }
})();
