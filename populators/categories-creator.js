const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const categories = [
  // Incomes Categories
  {
    label: 'Loja Pereira Tecnologia',
    type: 'INCOME',
    subcategories: [
      { label: 'Carregadores' },
      { label: 'Cabos USB' },
      { label: 'Outros cabos' },
      { label: 'Chips' },
      { label: 'Películas' },
      { label: 'Capas ' },
      { label: 'Câmeras ' },
      { label: 'Perfumes' },
      { label: 'Suportes' },
      { label: 'Outros' }
    ]
  },
  {
    label: ' Assistência Técnica',
    type: 'INCOME',
    subcategories: [
      { label: 'Configuração/formatação' },
      { label: 'Desbloqueio' },
      { label: 'Troca de telas' },
      { label: 'Troca de conectores' },
      { label: 'Limpeza' },
      { label: 'Outros' }
    ]
  },
  {
    label: 'Printlaser Personalizados',
    type: 'INCOME',
    subcategories: [
      { label: 'Lembrancinhas' },
      { label: 'Chaveiros' },
      { label: 'Canecas de porcelana' },
      { label: 'Canecas de chopp' },
      { label: 'Canecas de polímero' },
      { label: 'Maquetes/casas/replicas' },
      { label: 'Centros de mesas' },
      { label: 'Galeteiros' },
      { label: 'CakeBoards' },
      { label: 'Outros' }
    ]
  },

  // Expenses Categories
  {
    label: 'Prédio',
    type: 'EXPENSE',
    subcategories: [
      { label: 'Aluguel' },
      { label: 'Energia elétrica' },
      { label: 'Manutenções' },
      { label: 'Infraestrutura' },
      { label: 'Internet' },
      { label: 'Alvará' },
      { label: 'Impostos' },
      { label: 'Outros' }
    ]
  },
  {
    label: 'Salários',
    type: 'EXPENSE',
    subcategories: [
      { label: 'Colaboradores' },
      { label: 'Proprietários' },
      { label: 'Outros' }
    ]
  },
  {
    label: 'Substratos',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Suprimentos',
    type: 'EXPENSE',
    subcategories: [
      { label: 'Embalagens' },
      { label: 'Papeis especiais' },
      { label: 'Tintas' },
      { label: 'Colas' },
      { label: 'Outros' }
    ]
  },
  {
    label: 'Reposição de mercadorias',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Transportes/combustível',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Não registrado',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Empréstimos consedidos',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Equipamentos e ferramentas',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Empréstimos adiquiridos',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  },
  {
    label: 'Impostos',
    type: 'EXPENSE',
    subcategories: [{ label: 'MEI' }, { label: 'Outros' }]
  },
  {
    label: 'Outra retiradas',
    type: 'EXPENSE',
    subcategories: [{ label: 'Outros' }]
  }
]

;(async () => {
  try {
    for (const category of categories) {
      let createdCategory = await prisma.categories.findFirst({
        where: { label: category.label }
      })

      if (!createdCategory) {
        createdCategory = await prisma.categories.create({
          data: {
            label: category.label,
            type: category.type
          }
        })
      }

      for (const subcategory of category.subcategories) {
        const existingSubcategory = await prisma.subcategories.findFirst({
          where: {
            label: subcategory.label,
            category_id: createdCategory.id
          }
        })

        if (!existingSubcategory) {
          await prisma.subcategories.create({
            data: {
              category_id: createdCategory.id,
              label: subcategory.label
            }
          })
        }
      }
    }
  } catch (err) {
    console.error(err)
    throw new Error(err)
  } finally {
    await prisma.$disconnect()
  }
})()
