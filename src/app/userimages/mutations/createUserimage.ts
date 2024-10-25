import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateUserimageSchema, newCreateUserimageSchema } from "../schemas"
import path from "node:path"
import fs from "node:fs/promises"

export const config = {
  api: {
    bodyParser: false, // Deshabilitar el bodyParser por defecto de Next.js
  },
}

export default resolver.pipe(
  resolver.zod(newCreateUserimageSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    console.log(input)
    const file = input.file
    console.log(file)
    const name = input.name
    const imageHeight = input.imageHeight
    const imageWidth = input.imageWidth

    //Guardamos la imagen en la carpeta "public/uploads"
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), "public", "uploads", fileName)
    await fs.writeFile(filePath, new Uint8Array(buffer))

    const userImageToCreate = {
      name: name,
      fileName: fileName,
      userId: ctx.session.userId,
      height: imageHeight,
      width: imageWidth,
    }
    const userimage = await db.userimage.create({ data: userImageToCreate })

    return userimage
  }
)

/*
  console.log(input)
  const image = input.image as FormData
  const file = image.get("image") as File
  const buffer = Buffer.from(await file.arrayBuffer())

  // Generar un nombre único para el archivo
  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), "public", "uploads", fileName)

  // Guardar el archivo en la carpeta "public/uploads"
  await fs.writeFile(filePath, new Uint8Array(buffer))
  */
