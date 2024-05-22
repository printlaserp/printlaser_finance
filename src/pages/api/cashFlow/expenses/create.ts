import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    category,
    value,
    subcategory,
    description,
    account,
    observation,
    userId,
    create_at
  } = req.body

  const expense = {
    value: value,
    category: { connect: { id: category } },
    subcategory: { connect: { id: subcategory } },
    account: { connect: { id: account } },
    description: description,
    created_by: { connect: { id: userId } },
    observation: observation,
    create_at: create_at
  }
  try {
    await prisma.expenses.create({
      data: expense,
    })

    // Atualize o saldo da conta
    await prisma.accounts.update({
      where: { id: account },
      data: {
        balance: {
          decrement: expense.value, // Adicione o valor à conta
        },
      },
    })

    return res.status(201).json({})
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  } finally {
    await prisma.$disconnect();
  }
}
