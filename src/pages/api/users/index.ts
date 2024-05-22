import { UsersServices } from "@/services/usersServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body
  const usersServices = new UsersServices()
  try {
    const response = await usersServices.createUser(username)
    if (response.status === 200) {
      return res.status(200).json({})
    } else {
      return res.status(response.status).json({ error: response.error })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

