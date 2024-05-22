import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body
  try {
    const user = await prisma.users.findUnique({
      where: { username: username, active: true },
    })
    return res.status(200).json({ user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  } finally{
    await prisma.$disconnect();
  }
}
