import { BalanceServices } from "@/services/BanlanceServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const balanceServices = new BalanceServices()
        const balances = await balanceServices.getAllBalancesByAccount()
        res.status(200).json({
            balances
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

