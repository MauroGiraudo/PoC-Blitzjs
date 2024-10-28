import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import multer from "multer"
import path from "path"
import fs from "fs/promises"
import db from "db"
import { connectMiddleware, MiddlewareNext, MiddlewareResponse, RequestMiddleware } from "blitz"
import { api } from "@/src/app/blitz-server"
import { getSession } from "@blitzjs/auth"
import formidable from "formidable"
import cookie from "cookie"
import { BlitzAPIHandler, BlitzNextApiResponse, Ctx } from "@blitzjs/next"
import { Middleware } from "next/dist/lib/load-custom-routes.js"

/*
// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public", "uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileName as string)
  },
})

const upload = multer({ storage })


// Middleware para manejar la subida de archivos con multer
const uploadMiddleware = upload.single("image")
const uploadImage = connectMiddleware(uploadMiddleware as RequestMiddleware)
*/

const handler = async (req: NextRequest) => {
  if (req.method === "POST") {
    try {
      const data = await req.formData()
      const image: File | null = data.get("image") as unknown as File
      if (!image) {
        return NextResponse.json({ success: false, message: "No se ha seleccionado un archivo" })
      }

      const buffer = Buffer.from(await image.arrayBuffer())
      const fileName = data.get("fileName") as string
      const filePath = path.join(process.cwd(), "public", "uploads", fileName)
      await fs.writeFile(filePath, new Uint8Array(buffer))

      return NextResponse.json({ success: true, message: "Imagen guardada exitosamente" })
    } catch (error: any) {
      return NextResponse.json({ message: `Error: ${error.message}` })
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
