import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"

export class IncomesServices {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getIncomes() {
    try {
      const res = await this.prisma.incomings.findMany()
      return {
        status: 200,
        message: res.length > 0 ? "Incomes found!" : "Incomes not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async getIncomeById(id: string) {
    try {
      const res = await this.prisma.incomings.findUnique({
        where: {
          id,
        },
      })
      return {
        status: 200,
        message: res?.id ? "Income found!" : "Income not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async getIncomeSumToday() {
    try {
      const initialDate = new Date();
      initialDate.setHours(0, 0, 0, 0); // Define o horário para 00:00:00.000

      const finalDate = new Date()
      finalDate.setHours(23, 59, 59, 999)

      const incomesSum = await this.prisma.incomings.aggregate({
        _sum: {
          final_value: true,
        },
        where: {
          create_at: {
            gte: initialDate.toISOString(),
            lt: finalDate.toISOString()
          },
          active: true
        },
      })
      const finalValue = incomesSum?._sum?.final_value
      return Number(finalValue) || 0
    } catch (err) {
      throw err
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async getIncomeSumMonth() {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0);
      const incomesSum = await this.prisma.incomings.aggregate({
        _sum: {
          final_value: true,
        },
        where: {
          create_at: {
            gte: firstDayOfMonth,
          },
          active: true
        },
      });

      const finalValue = incomesSum?._sum?.final_value;
      return Number(finalValue) || 0;
    } catch (err) {
      throw err;
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async deleteIncome(id: string) {
    try {
      const res = await this.prisma.incomings.delete({
        where: {
          id,
        },
      })
      return {
        status: 200,
        message: "Deleted income!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect()
    }
  }
}
