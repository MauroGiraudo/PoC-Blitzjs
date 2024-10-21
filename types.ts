import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "@/db"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}

declare module "blitz" {
  export interface Ctx {
    file: any
  }
}
