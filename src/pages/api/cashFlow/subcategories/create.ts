import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { label, category_id } = req.body

  try {
    const subcategoryAlreadyExists = await prisma.subcategories.findFirst({
      where: {
        label: label,
      },
    })
    if (!subcategoryAlreadyExists) {
      await prisma.subcategories.create({
        data: { label, category_id },
      })
      return res.status(201).json({})
    } else {
      return res.status(409).json({ conflict: `${label} já existe!` })
    }
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  } finally {
    await prisma.$disconnect();
  }
}
