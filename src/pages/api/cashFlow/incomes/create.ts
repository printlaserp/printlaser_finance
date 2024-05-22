import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    value,
    category,
    subcategory,
    description,
    account,
    observation,
    create_at,
    card_type,
    card_banner,
    recurrence,
    card_payment_method,
    userId,
  } = req.body


  let fee = 0
  try {
    const data = await prisma.fees.findFirst({
      where: {
        card_banner,
        recurrence: parseInt(recurrence),
        payment_type: card_type
      }
    })

    fee = Number(data?.fee) || 0

    //Desconta a taxa de transação da máquina de cartão se a venda for feita no cartão
    const finalValue = card_payment_method ? (value - (Number(fee) * Number(value) / 100)) : value

    const incoming = {
      value,
      description,
      observation,
      create_at,
      card_type,
      card_banner,
      recurrence,
      card_payment_method, //Receita no cartão
      transaction_fee: fee,
      final_value: finalValue,
      category: { connect: { id: category } },
      subcategory: { connect: { id: subcategory } },
      created_by: { connect: { id: userId } },
      account: { connect: { id: account } },
    }

    await prisma.incomings.create({
      data: incoming
    })

    // Atualize o saldo da conta
    await prisma.accounts.update({
      where: { id: account },
      data: {
        balance: {
          increment: incoming.final_value, // Adicione o valor à conta
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
