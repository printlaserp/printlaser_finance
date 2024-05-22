import { prisma } from "@/lib/prisma"
import { CreatePurchaseDTO } from "@dtos/CreatePurchaseDTO"
import { ResponseDTO } from "@dtos/ResponseDTO"
import { PrismaClient, Purchases } from "@prisma/client"

export class CreditServices {
    private prisma: PrismaClient

    constructor() {
        this.prisma = prisma
    }

    async getPurchasesByCreditId(id: string): Promise<ResponseDTO<Purchases[]>> {
        try {
            const clients = await this.prisma.purchases.findMany({ where: { active: true, credit_id: id } })
            return {
                status: 200,
                message: "Débitos encontradas!",
                data: clients,
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: "Erro ao buscar os débitos!",
                error: err
            }
        }
    }

    async getPurchaseById(id: string): Promise<ResponseDTO<Purchases | null>> {
        try {
            const purchase = await this.prisma.purchases.findUnique({ where: { active: true, id: id } })
            return {
                status: 200,
                message: purchase ? "Débito encontrado" : "Débito não encontrado",
                data: purchase,
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: "Erro ao buscar o débito!",
                error: err
            }
        }
    }

    async createPurchase(data: CreatePurchaseDTO): Promise<ResponseDTO<Purchases>> {
        try {
            const purchase = await this.prisma.purchases.create({
                data: data,
            })
            return {
                status: 201,
                message: "Débito criado com sucesso!",
                data: purchase,
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: "Erro ao criar o débito!",
                error: JSON.stringify(err)
            }
        }
    }
}