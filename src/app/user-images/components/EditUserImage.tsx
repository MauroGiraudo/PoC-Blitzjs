"use client"
import { Suspense } from "react"
import updateUserImage from "../mutations/updateUserImage"
import getUserImage from "../queries/getUserImage"
import { UpdateUserImageSchema } from "../schemas"
import { FORM_ERROR, UserImageForm } from "./UserImageForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditUserImage = ({ userImageId }: { userImageId: number }) => {
  const [userImage, { setQueryData }] = useQuery(
    getUserImage,
    { id: userImageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserImageMutation] = useMutation(updateUserImage)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit UserImage {userImage.id}</h1>
        <pre>{JSON.stringify(userImage, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <UserImageForm
            submitText="Update UserImage"
            schema={UpdateUserImageSchema}
            initialValues={userImage}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserImageMutation({
                  ...values,
                  id: userImage.id,
                })
                await setQueryData(updated)
                router.refresh()
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
