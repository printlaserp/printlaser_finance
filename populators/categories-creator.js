const { hash } = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const categories = [
    //Incomes Categories
    {
        label: "Creative",
        type: "INCOME",
        subcategories: [
            { label: "Adesivo" },
            { label: "Apostila" },
            { label: "Arte" },
            { label: "Boleto" },
            { label: "Calendário" },
            { label: "Cópia" },
            { label: "Edição de documento" },
            { label: "Encadernação" },
            { label: "Fotos" },
            { label: "Fotos 3x4" },
            { label: "Impressão simples" },
            { label: "Impressão em quantidade" },
            { label: "Personalizado" },
            { label: "Plaquinha para bolo" },
            { label: "Plastificação" },
            { label: "Scanner" },
            { label: "Serviços diversos" },
            { label: "Recargas" },
            { label: "Outros" },
        ]
    },
    {
        label: "Assistência",
        type: "INCOME",
        subcategories: [
            { label: "Manutenção em celular" },
            { label: "Manutenção em computador" },
            { label: "Manutenção em impressora" },
            { label: "Outros" },
        ]
    },
    {
        label: "Investimento",
        type: "INCOME",
        subcategories: [
            { label: "Outros" },
        ]

    },
    {
        label: "Rendimento",
        type: "INCOME",
        subcategories: [
            { label: "Nuconta" },
            { label: "Mercado Pago" },
            { label: "Infinit Pay" },
        ]
    },
    {
        label: "Patrimônio",
        type: "INCOME",
        subcategories: [
            { label: "Outros" },
        ]
    },
    {
        label: "Mercadoria",
        type: "INCOME",
        subcategories: [
            { label: "Outros" },
        ]
    },
    //Expenses Categories
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
            { label: "Papeis diversos" },
            { label: "Papeis especiais" },
            { label: "Papel offset 180g" },
            { label: "Papel fotográfico 180g" },
            { label: "Papel fotográfico 230g" },
            { label: "Papel fotográfico adesivo 130g" },
            { label: "Papel fotográfico dupla face 200g" },
            { label: "Papel fotográfico dupla face 200g" },
            { label: "Tinta" },
            { label: "Colas" },
            { label: "Fita duplaface" },
            { label: "Espiras" },
            { label: "Polaseal" },
            { label: "Envelopes" },
            { label: "Materiais para escritório" },
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
]

try {
    categories.forEach(async (it) => {
        const createdCategory = await prisma.categories.create({
            data: {
                label: it.label,
                type: it.type
            }
        })

        it.subcategories.forEach(async (it) => {
            await prisma.subcategories.create({
                data: {
                    category_id: createdCategory.id,
                    label: it.label
                }
            })
        })
    })
} catch (err) {
    throw new Error(err)
}


