import { NextApiRequest, NextApiResponse } from "next"
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

// Middleware personalizado para procesar los campos del formulario
const processFormData = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    req.body = fields
    req.files = files
    next()
  })
}

const handler = async (req: NextApiRequest, res: BlitzNextApiResponse, ctx: Ctx) => {
  if (req.method === "POST") {
    try {
      /*// Procesar los campos del formulario antes de manejar la subida de la imagen
      await runMiddleware(req, res, processFormData)*/

      // Procesar la subida de la imagen usando el middleware de multer
      //await runMiddleware(req, res, connectMiddleware(uploadMiddleware as RequestMiddleware))
      uploadImage(req, res, ctx as MiddlewareNext)
      const file = req.file
      console.log(file)
      if (!file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" })
      }

      res.status(200).json({ message: "Imagen guardada exitosamente" })
    } catch (error: any) {
      res.status(500).json({ error: `Error: ${error.message}` })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Método ${req.method} no permitido`)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default api(handler)
