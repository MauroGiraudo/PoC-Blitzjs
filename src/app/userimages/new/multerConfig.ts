// src/api/rpc/[[...blitz]].ts
import { BlitzAPIHandler } from "@blitzjs/next"
import { Request, Response } from "express"
import { api } from "../../blitz-server"
import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { RequestMiddleware } from "blitz"

// Configuración de multer para almacenar imágenes en la carpeta 'public/images'
const upload = multer({
  dest: "public/images",
  limits: { fileSize: 5 * 1024 * 1024 }, // Limita el tamaño de la imagen a 5 MB
})

// Esquema Zod para validar los metadatos de la imagen
const imageSchema = z.object({
  mimetype: z.enum(["image/jpeg", "image/png", "image/gif"]),
  size: z.number().max(5 * 1024 * 1024, "El tamaño del archivo debe ser inferior a 5 MB"),
  originalname: z.string().min(1, "El nombre del archivo no puede estar vacío"),
})

// Middleware para manejar la subida de archivos con multer

export const uploadMiddleware = upload.single("image") as RequestMiddleware

// API handler para manejar la subida de la imagen
/*export default api(async (req: Request, res: Response, ctx) => {
  if (req.method === "POST") {
    // Procesar la subida de la imagen usando el middleware de multer
    uploadMiddleware(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message })
      } else if (err) {
        return res.status(500).json({ error: "Error interno del servidor" })
      }

      const file = req.file
      if (!file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" })
      }

      // Validar los metadatos de la imagen usando Zod
      const validationResult = imageSchema.safeParse({
        mimetype: file.mimetype,
        size: file.size,
        originalname: file.originalname,
      })

      if (!validationResult.success) {
        return res.status(400).json({
          message: "Error en la validación de la imagen",
          errors: validationResult.error.errors,
        })
      }

      // Si todo es válido, responde con éxito
      res.status(200).json({ message: "Imagen subida correctamente", file })
    })
  } else {
    res.status(405).json({ error: "Método no permitido" })
  }
})*/

/*

*/

// ----------------------------------

/*
// API handler para manejar la subida de la imagen
const handler: BlitzAPIHandler<void> = async (req: ExtendedNextApiRequest, res: NextApiResponse, ctx) => {
  if (req.method === "POST") {
    try {
      // Procesar la subida de la imagen usando el middleware de multer
      await runMiddleware(req, res, uploadMiddleware)

      const file = req.file
      if (!file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" })
      }

      // Validar los metadatos de la imagen usando Zod
      const validationResult = imageSchema.safeParse({
        mimetype: file.mimetype,
        size: file.size,
        originalname: file.originalname,
      })

      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.errors })
      }

      res.status(200).json({ message: "Imagen subida exitosamente", file })
    } catch (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ error: "Error interno del servidor" })
      }
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Método ${req.method} no permitido`)
  }
}
*/
