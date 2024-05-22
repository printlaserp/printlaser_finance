import { UsersServices } from "@/services/usersServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const usersServices = new UsersServices()
    const users = await usersServices.getUsers()

    return res.status(200).json({
      message: users && users.length > 0 ? "users found!" : "users not found!",
      data: users,
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

