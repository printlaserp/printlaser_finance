import { prisma } from "@/lib/prisma"
import { AccountsService } from "@services/AccountsServices"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const accountsServices = new AccountsService
    const accounts = await accountsServices.getAccounts()
    return res.status(200).json(accounts)
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  } finally {
    await prisma.$disconnect();
  }
}
