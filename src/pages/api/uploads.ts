import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
import path from "path"
import fs from "fs/promises"
import db from "db"
import { connectMiddleware } from "blitz"
import { api } from "@/src/app/blitz-server"
import { getSession } from "@blitzjs/auth"
import formidable from "formidable"
import cookie from "cookie"

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public", "uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileName)
  },
})

const upload = multer({ storage })

// Middleware para manejar la subida de archivos con multer
const uploadMiddleware = upload.single("image")

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

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Parsear las cookies del usuario
      const cookies = cookie.parse(req.headers.cookie || "")
      const csrfTokenFromCookie = cookies["__Host-blitz-csrfToken"]
      const csrfTokenFromHeader = req.headers["anti-csrf"]

      // Verificar el token CSRF
      if (csrfTokenFromHeader !== csrfTokenFromCookie) {
        return res.status(401).json({ name: "CSRFTokenMismatchError", statusCode: 401 })
      }

      // Procesar los campos del formulario antes de manejar la subida de la imagen
      await runMiddleware(req, res, processFormData)

      // Procesar la subida de la imagen usando el middleware de multer
      await runMiddleware(req, res, uploadMiddleware)

      const file = req.file
      console.log(file)
      if (!file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" })
      }

      res.status(200).json({ message: "Imagen guardada exitosamente" })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
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
