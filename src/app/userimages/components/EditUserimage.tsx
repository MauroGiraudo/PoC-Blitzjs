"use client"
import { Suspense } from "react"
import updateUserimage from "../mutations/updateUserimage"
import getUserimage from "../queries/getUserimage"
import { UpdateUserimageSchema } from "../schemas"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditUserimage = ({ userimageId }: { userimageId: number }) => {
  const [userimage, { setQueryData }] = useQuery(
    getUserimage,
    { id: userimageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserimageMutation] = useMutation(updateUserimage)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit Image {userimage.name}</h1>
        <pre>{JSON.stringify(userimage, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <UserimageForm
            submitText="Update Userimage"
            schema={UpdateUserimageSchema}
            initialValues={userimage}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserimageMutation({
                  ...values,
                  id: userimage.id,
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
