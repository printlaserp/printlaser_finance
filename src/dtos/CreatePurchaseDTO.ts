interface CreatePurchaseDTO {
    title: string,
    price: number,
    description: string,
    isService: boolean,
    user_id: string,
    Settled: boolean,
    credit_id: string,
}

export type { CreatePurchaseDTO }
