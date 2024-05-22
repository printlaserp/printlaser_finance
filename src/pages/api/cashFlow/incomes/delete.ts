import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    transaction_id,
  } = req.body

  try {
    const income = await prisma.incomings.findUnique({
      where: { id: transaction_id },
    })

    if (!income) {
      return res.status(400).json({ error: "Income not found for this id!" })
    }

    const { final_value, account_id } = income


    // Mark registre as INACTIVE (active=FALSE)
    await prisma.incomings.update({
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
          decrement: final_value, // Adicione o valor à conta
        },
      },
    })

    return res.status(201).json({})
  } catch (err) {
    res.json({ error: err })
    throw err
  }
  finally {
    await prisma.$disconnect();
  }
}