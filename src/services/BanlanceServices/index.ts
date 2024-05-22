import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { getYesterdayDate } from "@/utils/dateUtils"

export class BalanceServices {
    private prisma: PrismaClient

    constructor() {
        this.prisma = prisma
    }

    async getYesterdayBalance() {
        try {
            const previousBalances = await this.getBalanceByDate(getYesterdayDate())
            return previousBalances
        } catch (err) {
            throw err
        }
    }

    async getBalanceByDate(date: Date) {
        try {
            const initialDate = new Date(date);
            initialDate.setHours(0, 0, 0, 0); // Define o horário para 00:00:00.000
            const finalDate = new Date(date);
            finalDate.setHours(23, 59, 59, 999); // Define o horário para 23:59:59.999

            const incomesSum = await this.prisma.incomings.groupBy({
                by: ['account_id'],
                _sum: {
                    final_value: true,
                },
                where: {
                    create_at: {
                        gte: initialDate,
                        lt: finalDate,
                    },
                },
            });
            const expensesSum = await this.prisma.expenses.groupBy({
                by: ['account_id'],
                _sum: {
                    value: true,
                },
                where: {
                    create_at: {
                        gte: initialDate,
                        lt: finalDate,
                    },
                },
            });
            const transfers = await this.prisma.transferences.findMany({
                where: {
                    create_at: {
                        gte: initialDate,
                        lt: finalDate,
                    },
                },
                select: {
                    value: true,
                    origin_account_id: true,
                    target_account_id: true,
                }
            });

            const balance: { account_id: string; balance: number; }[] = [];

            // Processando as entradas (receitas) e despesas
            incomesSum.forEach((income) => {
                const matchingExpense = expensesSum.find((expense) => expense.account_id === income.account_id)
                const final_value = income._sum.final_value || 0
                const value = (matchingExpense && matchingExpense._sum.value) || 0
                const account_id = income.account_id

                const dailyBalance = {
                    account_id,
                    balance: Number(final_value) - Number(value),
                }

                balance.push(dailyBalance)
            })

            // Processando transferências
            transfers.forEach((transfer) => {
                const { origin_account_id, target_account_id, value } = transfer

                const originBalance = balance.find((entry) => entry.account_id === origin_account_id)
                const targetBalance = balance.find((entry) => entry.account_id === target_account_id)

                if (originBalance && targetBalance) {
                    // Subtrair o value da transferência da conta de origem e adicioná-lo à conta de destino
                    originBalance.balance -= Number(value)
                    targetBalance.balance += Number(value)
                }
            })
            return balance
        } catch (err) {
            throw err
        } finally {
            await this.prisma.$disconnect()
        }
    }

    async getAllBalancesByAccount() {
        try {
            const accounts = await this.prisma.accounts.findMany({
                select: {
                    label: true,
                    id: true,
                    initial_balance: true,
                },
                where: {
                    active: true
                }
            });
            const balances = []
            for (const account of accounts) {
                const entradas = await this.prisma.incomings.aggregate({
                    where: { account_id: account.id, active: true },
                    _sum: { final_value: true }
                })

                const saidas = await this.prisma.expenses.aggregate({
                    where: { account_id: account.id, active: true },
                    _sum: { value: true }
                })

                const transferenciasRecebidas = await this.prisma.transferences.aggregate({
                    where: { target_account_id: account.id, active: true },
                    _sum: { value: true }
                })

                const transferenciasEnviadas = await this.prisma.transferences.aggregate({
                    where: { origin_account_id: account.id, active: true },
                    _sum: { value: true }
                })

                const saldo = (Number(entradas._sum.final_value) || 0) - (Number(saidas._sum.value) || 0) + (Number(transferenciasRecebidas._sum.value) || 0) - (Number(transferenciasEnviadas._sum.value || 0)) + Number(account.initial_balance)
                // Atualizar o saldo da account no banco de dados
                balances.push({
                    label: accounts.find(it => it.id === account.id)?.label || account,
                    id: account.id,
                    balance: Number(saldo).toFixed(2),
                });

                // await this.prisma.accounts.update({
                //     where: { id: account.id },
                //     data: { balance: saldo },
                // });
            }
            return balances
        } catch (err) {
            throw err
        } finally {
            await this.prisma.$disconnect()
        }
    }

    async getBalancesSum() {
        try {
            const balance = await this.prisma.accounts.aggregate({
                _sum: { balance: true, initial_balance: true },
                where: { active: true }
            });
            const getalBalance = Number(balance._sum.balance) + Number(balance._sum.initial_balance)
            return getalBalance
        } catch (err) {
            throw err
        } finally {
            await this.prisma.$disconnect()
        }
    }
}
