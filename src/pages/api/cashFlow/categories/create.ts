import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { label, type } = req.body

  const categoryAlreadyExists = await prisma.categories.findFirst({
    where: {
      label: label,
    },
  })
  try {
    if (!categoryAlreadyExists) {
      await prisma.categories.create({
        data: { label, type },
      })
      return res.status(201).json({})
    } else {
      return res.status(409).json({ conflict: `${label} já existe!` })
    }
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }finally{
    await prisma.$disconnect();
  }
}
