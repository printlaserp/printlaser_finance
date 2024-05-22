import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      first_name: string
      last_name: string
      username: string
      password: string
      avatar_src?: string
      role: string
    }
  }
}
