import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { username, password } = req.body

  const secret = process.env.SECRET // Substitua por sua chave secreta.

  if (!secret) {
    throw new Error("No secret provided!")
  }

  try {
    const user = await prisma.users.findUnique({
      where: { username },
    })

    if (!user) {
      console.error("User not found")
      return res.status(400).json({ error: "Usuário não encontrado" })
    }

    const passwordValid = await compare(password, user.password)

    if (!passwordValid) {
      return res.status(401).json({ error: `Senha incorreta` })
    }

    const token = sign({ id: user.id }, secret || "", { expiresIn: "12h" })
    return res.status(200).json({ token: token, user: user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  } finally {
    await prisma.$disconnect();
  }
}

