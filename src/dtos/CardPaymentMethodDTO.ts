type CardPlaymentMethodDTO = {
    cardOption?: 'DEBIT' | 'CREDIT',
    recorrency?: number,
    cardBanner?: 'master-visa' | 'elo-hiper',
    taxa?: number,
}

export type { CardPlaymentMethodDTO }