import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "@/db"
import formidable from "formidable"

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

declare module "next" {
  interface NextApiRequest {
    file?: Express.Multer.File
    files?: formidable.Files<string>
  }
}
