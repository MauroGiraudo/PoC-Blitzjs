import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteUserImageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteUserImageSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userImage = await db.userImage.deleteMany({ where: { id } })

    return userImage
  }
)
