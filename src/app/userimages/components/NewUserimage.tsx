"use client"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createUserimageMutation] = useMutation(createUserimage)
  const router = useRouter()
  return (
    <UserimageForm
      submitText="Create Userimage"
      schema={CreateUserimageSchema}
      encType="multipart/form-data"
      onSubmit={async (values) => {
        try {
          console.log(values)
          /*const image = values.image as FormData
          console.log(image)
          const file = image.get("image") as File
          console.log(file)*/
          const userimage = await createUserimageMutation(values)
          router.push(`/userimages/${userimage.id}`)
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
