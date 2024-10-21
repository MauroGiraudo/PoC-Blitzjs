import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserimageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateUserimageSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    input.userId = ctx.session.userId
    const userimage = await db.userimage.create({ data: input })

    return userimage
  }
)
