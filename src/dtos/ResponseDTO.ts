interface ResponseDTO<T> {
  status: number
  message: string
  data?: T
  error?: any
}

export type { ResponseDTO }
