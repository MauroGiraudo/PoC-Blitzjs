import { z } from "zod"

export const CreateImageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  url: z.string(),
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateImageSchema = CreateImageSchema.merge(
  z.object({
    id: z.number(),
    userId: z.number(),
  })
)

export const DeleteImageSchema = z.object({
  id: z.number(),
})
