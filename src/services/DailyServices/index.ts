import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { CreateDailySummaryDTO } from "@dtos/CreateIncomeDTO copy"

export class DailyServices {
    private prisma: PrismaClient

    constructor() {
        this.prisma = prisma
    }

    async saveSummary(data: any, date?: Date) {
        try {
            // const summary = await JSON.parse(data)

            const dailySumary = await this.createDailySummary({
                incomes: data.incomesSumToday || 0,
                expenses: data.expensesSumToday || 0,
                others_balances: data
            })

            return dailySumary

        } catch (err) {
            throw err;
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async getSummaries(date?: Date) {
        try {
            const date_ = date || new Date()
            const month = date_.toISOString().slice(0, 7);

            const summaries = await this.prisma.dailySummaries.findMany({
                where: {
                    created_at: {
                        gte: new Date(`${month}-01T00:00:00.000Z`),
                        lt: new Date(new Date(`${month}-01T00:00:00.000Z`)
                            .setMonth(new Date(`${month}-01T00:00:00.000Z`).getMonth() + 1))
                    }
                }
            });

            const serializedSummaries = summaries.map(it => ({
                ...it,
                created_at: it.created_at.toISOString(),
                updated_at: it.updated_at.toISOString(),
            }));
            return serializedSummaries;
        } catch (err) {
            throw err;
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async createDailySummary({ incomes, expenses, others_balances, date }: CreateDailySummaryDTO) {
        try {
            const initialDate = new Date(date || new Date())
            initialDate.setHours(0, 0, 0, 0);
            const finalDate = new Date(initialDate);
            finalDate.setHours(23, 59, 59, 999); // Define o horário para 23:59:59.999

            const dailySummaryAlreadyExists = await this.prisma.dailySummaries.findFirst({
                where: {
                    created_at: {
                        gte: initialDate,
                        lt: finalDate,
                    },
                },
            })

            if (dailySummaryAlreadyExists) {
                await this.prisma.dailySummaries.delete({
                    where: {
                        id: dailySummaryAlreadyExists.id
                    }
                })
            }

            const dailySumary = await this.prisma.dailySummaries.create({
                data: {
                    incomes,
                    expenses,
                    others_balances
                }
            })

            return {
                dailySumary: dailySumary,
            }
        } catch (err) {
            throw err;
        } finally {
            await this.prisma.$disconnect();
        }
    }
}
