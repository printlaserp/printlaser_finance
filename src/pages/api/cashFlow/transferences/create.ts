import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { value, origin_account, target_account, description, observation, userId, date } =
    req.body

  try {
    const transference = {
      value: value,
      origin_account: { connect: { id: origin_account } },
      target_account: { connect: { id: target_account } },
      description: description,
      observation: observation,
      create_at: date,
      created_by: { connect: { id: userId } },
    }

    await prisma.transferences.create({
      data: transference,
    })

    // Atualize o saldo da conta de origem
    await prisma.accounts.update({
      where: { id: origin_account },
      data: {
        balance: {
          decrement: transference.value, // Adicione o valor à conta
        },
      },
    })
    // Atualize o saldo da conta destino
    await prisma.accounts.update({
      where: { id: target_account },
      data: {
        balance: {
          increment: transference.value, // Adicione o valor à conta
        },
      },
    })

    return res.status(201).json({})
  } catch (err) {
    res.json({ error: err })
    throw err
  } finally {
    await prisma.$disconnect();
  }
}
