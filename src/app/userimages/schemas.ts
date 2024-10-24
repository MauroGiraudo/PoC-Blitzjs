import { z } from "zod"

export const CreateUserimageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  fileName: z.string(),
  image: z.any().refine((files) => files?.[0].size > 0, "Imagen obligatoria"),
  //image: z.instanceof(FormData).refine((data) => !!data.get("image")),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateUserimageSchema = CreateUserimageSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteUserimageSchema = z.object({
  id: z.number(),
})
