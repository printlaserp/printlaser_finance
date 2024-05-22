import { DailyServices } from "@services/DailyServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = req.body
        const dailyServices = new DailyServices()
        await dailyServices.saveSummary(data)
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

