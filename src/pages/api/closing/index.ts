import { AccountsService } from "@/services/AccountsServices"
import { BalanceServices } from "@/services/BanlanceServices"
import { ExpensesService } from "@/services/ExpensesServices"
import { IncomesServices } from "@/services/IncomesServices"
import { DailyServices } from "@services/DailyServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const incomesSevices = new IncomesServices()
        const expensesSevices = new ExpensesService()
        const accountsSevices = new AccountsService()
        const balanceServices = new BalanceServices()
        const dailyServices = new DailyServices()

        const incomesSumToday = await incomesSevices.getIncomeSumToday()
        const incomesSumMonth = await incomesSevices.getIncomeSumMonth()
        const expensesSumToday = await expensesSevices.getExpensesSumToday()
        const expensesSumMonth = await expensesSevices.getExpensesSumMonth()
        const accountsBalanceSum = await accountsSevices.getAccountsBalancesSum()
        const geralBalance = await balanceServices.getBalancesSum()
        const dailySummaries = await dailyServices.getSummaries()
        const accounts = await accountsSevices.getAccounts()

        res.status(200).json({
            incomesSumToday,
            incomesSumMonth,
            expensesSumToday,
            expensesSumMonth,
            accountsBalanceSum,
            geralBalance,
            dailySummaries,
            accounts
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

