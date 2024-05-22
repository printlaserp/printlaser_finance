import { AccountsService } from "@/services/AccountsServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const accountsSevices = new AccountsService()
        const accounts = await accountsSevices.getAccounts()
        res.status(200).json({
            accounts
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

