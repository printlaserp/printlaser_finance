import { CreateUserDTO } from "@/dtos/CreateUserDTO"
import { prisma } from "@/lib/prisma"
import { CreateClientDTO } from "@dtos/CreateClientDTO"
import { ResponseDTO } from "@dtos/ResponseDTO"
import { Clients, PrismaClient, Users } from "@prisma/client"

export class ClientsServices {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getClients(): Promise<ResponseDTO<Clients[]>> {
    try {
      const clients = await this.prisma.clients.findMany({ where: { active: true } })
      return {
        status: 200,
        message: "Clientes encontrados!",
        data: clients,
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500,
        message: "Erro ao buscar os clientes!",
        error: err
      }
    }
  }

  async getClientById(id: any): Promise<ResponseDTO<Clients | null>> {
    try {
      console.log(id)
      const client = await this.prisma.clients.findUnique({ where: { active: true, id: id } })
      return {
        status: 200,
        message: client ? "Cliente encontrado" : "cliente não encontrado",
        data: client,
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500,
        message: "Erro ao buscar os clientes!",
        error: err
      }
    }
  }

  async createClient(data: CreateClientDTO): Promise<ResponseDTO<Clients>> {
    try {
      const res = await this.prisma.clients.create({
        data: data,
      })
      return {
        status: 201,
        message: "Cliente criado com sucesso!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return {
        status: 500,
        message: "Erro ao criar o cliente!",
        error: JSON.stringify(err)
      }
    }
  }

}