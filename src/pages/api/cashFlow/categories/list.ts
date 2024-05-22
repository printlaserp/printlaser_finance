import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.categories.findMany()
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }finally{
    await prisma.$disconnect();
  }
}
