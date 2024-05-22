import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"

export class ExpensesService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getExpenses() {
    try {
      const res = await this.prisma.expenses.findMany()
      return {
        status: 200,
        message: res.length > 0 ? "Expenses found!" : "Expenses not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await prisma.$disconnect()
    }
  }

  async getExpensesById(id: string) {
    try {
      const res = await this.prisma.expenses.findUnique({
        where: {
          id,
        },
      })
      return {
        status: 200,
        message: res?.id ? "Expense found!" : "Expense not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await prisma.$disconnect()
    }
  }

  async getExpensesSumToday() {
    try {
      const initialDate = new Date(new Date());
      initialDate.setHours(0, 0, 0, 0); // Define o horário para 00:00:00.000
      const finalDate = new Date()
      finalDate.setHours(23, 59, 59, 999)

      const expensesSum = await this.prisma.expenses.aggregate({
        _sum: {
          value: true,
        },
        where: {
          create_at: {
            gte: initialDate,
            lt: finalDate.toISOString()
          },
          active: true,
        },
      })
      const value = expensesSum?._sum?.value
      return Number(value) || 0
    } catch (err) {
      throw err
    } finally {
      await prisma.$disconnect()
    }
  }

  async getExpensesSumMonth() {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0);
      const expensesSum = await this.prisma.expenses.aggregate({
        _sum: {
          value: true,
        },
        where: {
          create_at: {
            gte: firstDayOfMonth,
          },
          active: true
        },
      });

      const value = expensesSum?._sum?.value;
      return Number(value) || 0;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect()
    }
  }

  async deleteExpense(id: string) {
    try {
      const res = await this.prisma.expenses.delete({
        where: {
          id,
        },
      })
      return {
        status: 200,
        message: "Deleted expense!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await prisma.$disconnect()
    }
  }
}
