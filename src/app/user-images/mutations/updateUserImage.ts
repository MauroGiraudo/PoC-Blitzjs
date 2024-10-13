import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateUserImageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateUserImageSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userImage = await db.userImage.update({ where: { id }, data })

    return userImage
  }
)
