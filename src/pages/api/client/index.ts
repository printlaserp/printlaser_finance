import { ClientsServices } from "@services/ClientsServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body: data, method, query } = req
    const clientsServices = new ClientsServices()
    const { id } = query

    console.log(id)

    const clientId = (id instanceof Array) ? id[0] : id

    if (method === 'GET' && clientId) {
      const response = await clientsServices.getClientById(clientId)
      if (response.status === 200) {
        return res.status(200).json(response)
      } else {
        return res.status(response.status).json(response)
      }
    }

    if (method === 'GET') {
      const response = await clientsServices.getClients()
      if (response.status === 200) {
        return res.status(200).json(response)
      } else {
        return res.status(response.status).json(response)
      }
    }

    if (method === 'POST') {
      const response = await clientsServices.createClient(data)
      if (response.status === 201) {
        return res.status(201).json(response)
      } else {
        return res.status(response.status).json(response)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

