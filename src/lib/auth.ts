// lib/auth.js
import { compare, hash } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import { prisma } from "./prisma"
import Cookies from "js-cookie"

const secret = process.env.SECRET // Substitua por sua chave secreta.

export async function signIn(username: string, password: string) {
  try {

    const user = await prisma.users.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    const passwordValid = await compare(password, user.password)

    if (!passwordValid) {
      throw new Error("Senha incorreta")
    }

    const token = sign({ userId: user.id }, secret || "", { expiresIn: "12h" })

    Cookies.set("authToken", token)
  } catch (err) {
    throw err
  } finally {
    await prisma.$disconnect();
  }
}

export function decodeToken(token: string) {
  try {
    const decoded = verify(token, secret || "")
    return decoded
  } catch (error) {
    return null
  }
}
