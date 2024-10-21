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
    input.userId = ctx.session.userId

    // Reemplazaar fileName por el originalname del archivo. Además, tenemos que almacenar la imagen en public/images

    const finalUserImage: userImage = {
      name: input.name,
      fileName: input.fileName,
      userId: input.userId,
    }

    const userimage = await db.userimage.create({ data: finalUserImage })

    return userimage
  }
)
