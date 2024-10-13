"use client"
import { FORM_ERROR, UserImageForm } from "./UserImageForm"
import { CreateUserImageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserImage from "../mutations/createUserImage"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createUserImageMutation] = useMutation(createUserImage)
  const router = useRouter()
  return (
    <UserImageForm
      submitText="Create UserImage"
      schema={CreateUserImageSchema}
      onSubmit={async (values) => {
        try {
          const userImage = await createUserImageMutation(values)
          router.push(`/userImages/${userImage.id}`)
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
