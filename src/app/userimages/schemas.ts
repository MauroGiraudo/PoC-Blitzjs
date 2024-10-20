import { z } from "zod"

export const CreateUserimageSchema = z.object({
  userId: z.number(),
  name: z.string(),
  fileName: z.string(),
  usImage: z.
  /*usImage: z.custom((val) => val instanceof File, {
    message: "File is required",
  }),*/
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
