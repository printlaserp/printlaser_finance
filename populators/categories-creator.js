const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
    // Incomes Categories
    {
        label: "Categoria 1",
        type: "INCOME",
        subcategories: [
            { label: "Subcategoria 1" },
            { label: "Subcategoria 2" },
            { label: "Subcategoria 3" },
        ]
    },
    // Expenses Categories
    {
        label: "Prédio",
        type: "EXPENSE",
        subcategories: [
            { label: "Aluguel" },
            { label: "Energia elétrica" },
            { label: "Manutenção" },
            { label: "Infraestrutura" },
            { label: "Internet" },
            { label: "Alvará" },
            { label: "Impostos" },
            { label: "Outros" },
        ]
    },
    {
        label: "Salários",
        type: "EXPENSE",
        subcategories: [
            { label: "Colaboradores" },
            { label: "Proprietários" },
            { label: "Outros" },
        ]
    },
    {
        label: "Substratos",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Suprimentos",
        type: "EXPENSE",
        subcategories: [
            { label: "Embalagen" },
            { label: "Papeis especiais" },
            { label: "Tinta" },
            { label: "Colas" },
            { label: "Outros" },
        ]
    },
    {
        label: "Reposição de mercadorias",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Transportes/combustível",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Não registrado",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Empréstimo consedido",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Equipamentos e ferramentas",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Emprestimo adiquirido",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Imposto",
        type: "EXPENSE",
        subcategories: [
            { label: "MEI" },
            { label: "Outros" },
        ]
    },
    {
        label: "Outra retirada",
        type: "EXPENSE",
        subcategories: [
            { label: "Outros" },
        ]
    },
];

(async () => {
    try {
        for (const category of categories) {
            let createdCategory = await prisma.categories.findFirst({
                where: { label: category.label }
            });

            if (!createdCategory) {
                createdCategory = await prisma.categories.create({
                    data: {
                        label: category.label,
                        type: category.type
                    }
                });
            }

            for (const subcategory of category.subcategories) {
                const existingSubcategory = await prisma.subcategories.findFirst({
                    where: {
                        label: subcategory.label,
                        category_id: createdCategory.id
                    }
                });

                if (!existingSubcategory) {
                    await prisma.subcategories.create({
                        data: {
                            category_id: createdCategory.id,
                            label: subcategory.label
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(err);
    } finally {
        await prisma.$disconnect();
    }
})();
