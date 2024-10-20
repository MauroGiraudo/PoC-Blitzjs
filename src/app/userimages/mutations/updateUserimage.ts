import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateUserimageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateUserimageSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userimage = await db.userimage.update({ where: { id }, data })

    return userimage
  }
)
