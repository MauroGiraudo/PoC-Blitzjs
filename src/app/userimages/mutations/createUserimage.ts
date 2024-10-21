import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserimageSchema } from "../schemas"

type userImage = {
  name: string
  fileName: string
  userId: number
}

export default resolver.pipe(resolver.authorize(), async (input: any, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  input.userId = ctx.session.userId
  const userImagetoCreate: userImage = {
    name: input.name,
    fileName: input.image,
    userId: input.userId,
  }
  const userimage = await db.userimage.create({ data: userImagetoCreate })

  return userimage
})
