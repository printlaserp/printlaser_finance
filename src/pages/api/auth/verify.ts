import { prisma } from "@/lib/prisma"
import { verify } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body
  const secret = process.env.SECRET || ""

  if (!token) {
    return res.status(401).json({ error: "No token provided!" })
  }

  if (!secret) {
    return res.status(500).json({ error: "No secret provided!" })
  }

  try {
    const decoded = verify(token, secret);
    //@ts-ignore
    const { id, exp } = decoded;

    if (Date.now() >= exp * 1000) {
      // O token expirou
      return res.status(401).json({ error: "Token expirado" });
    }

    // Token não expirou, continue com a lógica
    const user = await prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        role: true,
        avatar_src: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  } finally {
    await prisma.$disconnect();
  }
}
