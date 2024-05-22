interface CreateUserDTO {
  first_name: string
  last_name: string
  username: string
  password: string
  avatar_src?: string | null
  role?: string
}

export type { CreateUserDTO }
