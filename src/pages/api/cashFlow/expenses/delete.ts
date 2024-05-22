import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    transaction_id,
  } = req.body

  try {

    const expense = await prisma.expenses.findUnique({
      where: { id: transaction_id },
    })

    if (!expense) {
      return res.status(400).json({ error: "Income not found for this id!" })
    }

    const { value, account_id } = expense


    // Mark registre as INACTIVE (active=FALSE)
    await prisma.expenses.update({
      where: { id: transaction_id },
      data: {
        active: false
      },
    })

    // Atualize o saldo da conta
    await prisma.accounts.update({
      where: { id: account_id },
      data: {
        balance: {
          increment: value, // Adicione o valor à conta
        },
      },
    })

    return res.status(201).json({})
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }
}