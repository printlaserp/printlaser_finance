import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    transaction_id,
  } = req.body

  try {
    const transfer = await prisma.transferences.findUnique({
      where: { id: transaction_id },
    })

    if (!transfer) {
      return res.status(400).json({ error: "Transfer not found for this id!" })
    }

    const { origin_account_id, target_account_id, value } = transfer


    // Mark registre as INACTIVE (active=FALSE)
    await prisma.transferences.update({
      where: { id: transaction_id },
      data: {
        active: false
      },
    })

    // Atualize o saldo da conta de origem
    await prisma.accounts.update({
      where: { id: origin_account_id },
      data: {
        balance: {
          increment: value, // Adicione o valor à conta
        },
      },
    })
    
    // Atualize o saldo da conta de destino
    await prisma.accounts.update({
      where: { id: target_account_id },
      data: {
        balance: {
          decrement: value, // Adicione o valor à conta
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