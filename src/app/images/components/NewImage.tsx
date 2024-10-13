"use client"
import { FORM_ERROR, ImageForm } from "./ImageForm"
import { CreateImageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createImage from "../mutations/createImage"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createImageMutation] = useMutation(createImage)
  const router = useRouter()
  return (
    <ImageForm
      submitText="Create Image"
      schema={CreateImageSchema}
      onSubmit={async (values) => {
        try {
          const image = await createImageMutation(values)
          router.push(`/images/${image.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
