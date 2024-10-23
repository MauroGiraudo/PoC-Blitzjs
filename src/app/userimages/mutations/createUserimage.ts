import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserimageSchema } from "../schemas"
import path from "node:path"
import fs from "node:fs/promises"

type userImage = {
  name: string
  fileName: string
  userId: number
}

export const config = {
  api: {
    bodyParser: false, // Deshabilitar el bodyParser por defecto de Next.js
  },
}

export default resolver.pipe(
  resolver.zod(CreateUserimageSchema),
  resolver.authorize(),
  async (input: any, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    input.userId = ctx.session.userId

    console.log(input)
    const image = input.image as FormData
    const file = image.get("image") as File
    const buffer = Buffer.from(await file.arrayBuffer())

    // Generar un nombre único para el archivo
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), "public", "uploads", fileName)

    // Guardar el archivo en la carpeta "public/uploads"
    await fs.writeFile(filePath, new Uint8Array(buffer))

    const userImagetoCreate: userImage = {
      name: input.name,
      fileName: fileName,
      userId: input.userId,
    }
    const userimage = await db.userimage.create({ data: userImagetoCreate })

    return userimage
  }
)
