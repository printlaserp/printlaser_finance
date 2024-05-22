import { prisma } from "@lib/prisma"
import { TransactionsServices } from "@services/TransactionsServices"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { account, category, subcategory, type, gte, lt } = req.body
    try {
        const isValidDate = (dateString: string | undefined) => {
            return dateString ? !isNaN(new Date(dateString).getTime()) : false
        }

        if (!isValidDate(gte) || !isValidDate(lt)) {
            return res.status(400).json({ error: 'gte and lt must be valid date strings' })
        }

        const transactionsServices = new TransactionsServices()
        const transactions = await transactionsServices.getTransactions({
            account,
            category,
            subcategory,
            type,
            gte,
            lt
        })
        return res.status(200).json(transactions)
    } catch (err) {
        res.json({ error: err })
        throw err
    } finally {
        await prisma.$disconnect()
    }
}
