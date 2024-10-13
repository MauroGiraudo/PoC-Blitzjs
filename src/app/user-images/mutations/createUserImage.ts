import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserImageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateUserImageSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userImage = await db.userImage.create({ data: input })

    return userImage
  }
)
