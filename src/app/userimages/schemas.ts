import { z } from "zod"

export const CreateUserimageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  fileName: z.string(),

  image: z.instanceof(Blob).optional(),
  //id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateUserimageSchema = CreateUserimageSchema.merge(
  z.object({
    id: z.number(),
    //userId: z.number(),
  })
)

export const DeleteUserimageSchema = z.object({
  id: z.number(),
})

/*
usImage: z
    .object({
      mimetype: z.enum(["image/jpeg", "image/png", "image/gif", "image/jpg"]).optional(),
      size: z
        .number()
        .max(5 * 1024 * 1024, "El tamaño del archivo debe ser inferior a 5 MB")
        .optional(),
      originalname: z.string().min(1, "El nombre del archivo no puede estar vacío").optional(),
    })
    .optional(),
*/
