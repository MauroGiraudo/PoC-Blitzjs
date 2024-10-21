"use client"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"

type userImage = {
  id: number
  name: string
  fileName: string
  userId: number
}

export function New__ModelName() {
  const [createUserimageMutation] = useMutation(createUserimage)
  const router = useRouter()
  return (
    <UserimageForm
      submitText="Create Userimage"
      onSubmit={async (values) => {
        const userImagetoCreate: userImage = {
          id: values.id || 0,
          name: values.name || "",
          fileName: values.image || "",
          userId: values.userId || 0,
        }
        try {
          const userimage = await createUserimageMutation(userImagetoCreate)
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
