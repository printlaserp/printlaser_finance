import { prisma } from "@/lib/prisma"
import { CreateAccountDTO } from "@dtos/CreateAccountsDTO"
import { PrismaClient } from "@prisma/client"

export class AccountsService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  async getAccountsBalancesSum() {
    try {
      const AccountsBalanceSum = await this.prisma.accounts.aggregate({
        _sum: {
          balance: true,
          initial_balance: true
        },
        where: {
          active: true
        },
      })
      const value = AccountsBalanceSum?._sum?.balance
      return Number(value) || 0
    } catch (err) {
      throw err
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async deleteAccount(id: string) {
    try {
      const res = await this.prisma.accounts.delete({
        where: {
          id,
        },
      })
      return {
        status: 200,
        message: "Deleted account!",
        data: res,
      }
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect();
    }
  }
  async createAccount({
    label, description, logo_url, is_default, is_card_account, type, initial_balance
  }: CreateAccountDTO) {
    try {
      const accountExists = await prisma.accounts.findFirst({
        where: {
          label: label,
        },
      })
      if (!accountExists) {
        const result = await prisma.accounts.create({
          data: { label, logo_url, initial_balance, description, is_default, is_card_account, type },
        })
        if (is_default) {
          await prisma.accounts.updateMany({
            where: {
              NOT: {
                id: result.id, // Exclui a conta padrão da atualização
              },
            },
            data: {
              is_default: false,
            },
          })
        }
        return result
      } else {
        throw new Error(`${label} já existe!`)
      }

    } catch (err) {
      return { error: err }
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAccounts() {
    try {
      const accounts = await this.prisma.accounts.findMany({
        where: {
          active: true
        },
        select: {
          id: true,
          label: true,
          logo_url: true,
          balance: true,
          initial_balance: true,
          description: true,
          color: true,
          is_card_account: true,
          create_at: true,
          updated_at: true,
          is_default: true,
          type: true,
          access_level: true,
        }
      })

      const serializedAccounts = accounts.map(it => ({
        ...it,
        balance: (it.balance).toNumber() + (it.initial_balance).toNumber(),
        create_at: it.create_at.toISOString(),
        updated_at: it.updated_at.toISOString(),
      }));

      return serializedAccounts
    } catch (err) {
      console.log(err)
      return { status: 500, message: "internal error!", error: err }
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
