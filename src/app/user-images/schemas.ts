import { z } from "zod"

export const CreateUserImageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  fileName: z.string(),
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateUserImageSchema = CreateUserImageSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteUserImageSchema = z.object({
  id: z.number(),
})
