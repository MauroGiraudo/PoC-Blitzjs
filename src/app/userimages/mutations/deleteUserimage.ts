import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteUserimageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteUserimageSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userimage = await db.userimage.deleteMany({ where: { id } })

    return userimage
  }
)
