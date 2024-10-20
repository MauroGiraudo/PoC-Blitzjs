import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserimageSchema } from "../schemas"

type userImage = {
  name: string
  fileName: string
  userId: number
}

export default resolver.pipe(
  resolver.zod(CreateUserimageSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    //multerPlugin
    input.userId = ctx.session.userId

    const finalUserImage: userImage = {
      name: input.name,
      fileName: input.fileName,
      userId: input.userId,
    }

    const userimage = await db.userimage.create({ data: finalUserImage })

    return userimage
  }
)
