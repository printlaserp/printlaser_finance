interface CreateAccountDTO {
  label: string
  description: string
  logo_url: string
  initial_balance: number
  is_default: boolean
  is_card_account: boolean
  type: string
}

export type { CreateAccountDTO }

