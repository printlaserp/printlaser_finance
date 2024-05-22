import { CreateUserDTO } from "@/dtos/CreateUserDTO"
import { prisma } from "@/lib/prisma"
import { PrismaClient, Users } from "@prisma/client"

export class UsersServices {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getUsers(): Promise<Users[] | undefined> {
    try {
      const users = await this.prisma.users.findMany({ where: { active: true } })
      return users
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  async createUser(data: CreateUserDTO) {
    try {
      const res = await this.prisma.users.create({
        data: data,
      })
      return {
        status: 201,
        message: "Usuário criado com sucesso!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    }
  }

  async getUserById(id: string) {
    try {
      const res = await this.prisma.users.findUnique({
        where: {
          id,
          active: true
        },
      })
      return {
        status: 200,
        message: res?.id ? "user found!" : "user not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    }
  }
  async getUserUsername(username: string) {
    try {
      const res = await this.prisma.users.findUnique({
        where: {
          id: username,
          active: true,
        },
      })
      return {
        status: 200,
        message: res?.id ? "user found!" : "user not found!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    }
  }
}
