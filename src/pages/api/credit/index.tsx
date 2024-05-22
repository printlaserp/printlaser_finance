import { ClientsServices } from "@services/ClientsServices"
import { CreditServices } from "@services/CreditServices"
import { NextApiResponse, NextApiRequest } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body: data, method, query } = req
    const creditServices = new CreditServices()
    const { credit_id, purchase_id } = query

    const creditId = (credit_id instanceof Array) ? credit_id[0] : credit_id
    const purchaseId = (purchase_id instanceof Array) ? purchase_id[0] : purchase_id

    if (method === 'GET' && creditId) {
      const response = await creditServices.getPurchasesByCreditId(creditId)
      if (response.status === 200) {
        return res.status(200).json(response)
      } else {
        return res.status(response.status).json(response)
      }
    }

    if (method === 'GET' && purchaseId) {
      const response = await creditServices.getPurchaseById(purchaseId)
      if (response.status === 200) {
        return res.status(200).json(response)
      } else {
        return res.status(response.status).json(response)
      }
    }

    if (method === 'POST') {
      const response = await creditServices.createPurchase(data)
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

