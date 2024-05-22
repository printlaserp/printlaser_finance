interface UserDTO {
  id: string
  first_name: string
  last_name: string
  username: string
  password: string
  avatar_src: string | null
  role: string
  create_at: Date
  updated_at: Date
}

interface ShortUserDTO {
  id: string
  first_name: string
  last_name: string
  username: string
  avatar_src: string | null
  role: 'ADMIN' | 'ROOT' | 'CASHIER'
}

export type { UserDTO, ShortUserDTO }
