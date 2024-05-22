export type FiltersType = {
    category: string | null
    subcategory: string | null
    type: 'TRANSACTIONS' | 'INCOME' | 'EXPENSE' | 'TRANSFERENCE'
    account: string | null
}

export type TransactionsFiltersType = {
    account: string | undefined
    category: string | undefined
    subcategory: string | undefined
    type: 'TRANSACTIONS' | 'INCOME' | 'EXPENSE' | 'TRANSFERENCE'
    gte: string | undefined
    lt: string | undefined
}