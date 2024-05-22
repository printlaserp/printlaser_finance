import { prisma } from "@/lib/prisma"
import { TransactionsFiltersType } from "@dtos/FiltersDTO"
import { Expenses, Incomings, PrismaClient, Transferences } from "@prisma/client"

export class TransactionsServices {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getTransactions(filters: TransactionsFiltersType) {
    try {
      let incomes: Incomings[] | [] = []
      if (filters.type === 'INCOME' || filters.type === 'TRANSACTIONS') {
        const whereClause: any = {
          active: true,
          create_at: {
            gte: filters.gte,
            lt: filters.lt,
          },
        }

        if (filters.account) {
          whereClause.account_id = {
            in: [filters.account],
          }
        }

        if (filters.category) {
          whereClause.category_id = {
            in: [filters.category],
          }
        }

        if (filters.subcategory) {
          whereClause.category_id = {
            in: [filters.subcategory],
          }
        }

        incomes = await this.prisma.incomings.findMany({
          where: whereClause,
        })
      }

      let expenses: Expenses[] | [] = []
      if (filters.type === 'EXPENSE' || filters.type === 'TRANSACTIONS') {
        const whereClause: any = {
          active: true,
          create_at: {
            gte: filters.gte,
            lt: filters.lt,
          },
        }

        if (filters.account) {
          whereClause.account_id = {
            in: [filters.account],
          }
        }

        if (filters.category && filters.category.length > 0) {
          whereClause.category_id = {
            in: [filters.category],
          }
        }

        expenses = await this.prisma.expenses.findMany({
          where: whereClause,
        })
      }

      let transferences: Transferences[] | [] = [];
      if (filters.type === 'TRANSFERENCE' || filters.type === 'TRANSACTIONS') {
        const whereClause: any = {
          active: true,
          create_at: {
            gte: filters.gte,
            lt: filters.lt,
          },
        }

        if (filters.account) {
          whereClause.OR = [
            {
              origin_account_id: {
                in: [filters.account],
              },
            },
            {
              target_account_id: {
                in: [filters.account],
              },
            },
          ];

        }
        transferences = await this.prisma.transferences.findMany({
          where: whereClause,
        });
      }

      const serializedIncomes = incomes.map(it => ({
        ...it,
        balance: it.final_value.toNumber(),
        create_at: it.create_at.toISOString(),
        updated_at: it.updated_at.toISOString()
      }))

      const serializedExpenses = expenses.map(it => ({
        ...it,
        balance: it.value.toNumber(),
        create_at: it.create_at.toISOString(),
        updated_at: it.updated_at.toISOString()
      }))

      const serializedTransferences = transferences.map(it => ({
        ...it,
        value: it.value.toNumber(),
        create_at: it.create_at.toISOString(),
        updated_at: it.updated_at.toISOString()
      }))

      const transactions = [
        ...serializedIncomes,
        ...serializedExpenses,
        ...serializedTransferences,
      ]

      //@ts-ignore
      transactions.sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
      return transactions

    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
