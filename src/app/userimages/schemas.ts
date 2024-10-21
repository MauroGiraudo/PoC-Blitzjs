import { z } from "zod"

export const CreateUserimageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  fileName: z.string(),
  image: z.instanceof(File).refine((data) => data.name === "string"),
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
