/*import multer from "multer"
import path from "path"
import fs from "fs"
import { createServerPlugin, Ctx, BlitzServerPlugin } from "blitz"
import { NextFunction, Request, Response } from "express"
import { BlitzServerMiddleware } from "@blitzjs/next"

type CustomPluginOptions = {}

// Configurar Multer para almacenar archivos en la carpeta "public/images"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "public/images")

    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir) // Especifica el destino donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Genera un nombre único usando la marca de tiempo y la extensión original
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// Inicializa multer con la configuración
const upload = multer({ storage })

// Middleware para manejar la carga de un solo archivo (campo "image")
const multerMiddleware = upload.single("image")

// Crear el plugin de multer para usarlo en las mutaciones de Blitz.js
export const multerPlugin = createServerPlugin<{}, Ctx, {}, {}>((options: {}) => {
  return {
    requestMiddlewares: [
      {
        beforeHttpRequest: (req: Request) => {
          multerMiddleware(req, res, (error) => {
            if (error instanceof multer.MulterError) {
              // Si hay un error específico de Multer, devolver una respuesta de error
              return res.status(500).json({ error: error.message })
            } else if (error) {
              // Manejar otros errores
              return res.status(500).json({ error: "Error uploading the image" })
            }
          })
        },
      },
    ],
    exports: () => ({ file: req.file }),
  }
})

*/

/*
name: = "multerPlugin",

  setup: (handler) => {
    return (req, res) => {
      // Usa multer para procesar el archivo subido antes de pasar al handler original
      multerMiddleware(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // Si hay un error específico de Multer, devolver una respuesta de error
          return res.status(500).json({ error: err.message })
        } else if (err) {
          // Manejar otros errores
          return res.status(500).json({ error: "Error uploading the image" })
        }

        // Si todo salió bien, continuar con el procesamiento normal
        handler(req, res)
      })
    }
  },
*/

/*
        beforeHttpRequest: (req: Request) => {
          multerMiddleware(req, res, (error) => {
            if (error instanceof multer.MulterError) {
              // Si hay un error específico de Multer, devolver una respuesta de error
              return res.status(500).json({ error: error.message })
            } else if (error) {
              // Manejar otros errores
              return res.status(500).json({ error: "Error uploading the image" })
            }
          })
        },
*/
