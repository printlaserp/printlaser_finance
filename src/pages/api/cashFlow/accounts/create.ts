import { AccountsService } from "@services/AccountsServices"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { label, description, logo_url, value, is_default, is_card_account, type } = req.body
  const initial_balance = value !== "" ? Number(value) : 0

  const accountsServices = new AccountsService()

  try {
    await accountsServices.createAccount({
      label, description, logo_url, is_default, is_card_account, type, initial_balance
    })
    return res.status(201).json({ data: 'Conta criada com sucesso.' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}


