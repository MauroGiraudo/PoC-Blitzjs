"use client"
import { Suspense } from "react"
import updateImage from "../mutations/updateImage"
import getImage from "../queries/getImage"
import { UpdateImageSchema } from "../schemas"
import { FORM_ERROR, ImageForm } from "./ImageForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditImage = ({ imageId }: { imageId: number }) => {
  const [image, { setQueryData }] = useQuery(
    getImage,
    { id: imageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateImageMutation] = useMutation(updateImage)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit Image {image.id}</h1>
        <pre>{JSON.stringify(image, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ImageForm
            submitText="Update Image"
            schema={UpdateImageSchema}
            initialValues={image}
            onSubmit={async (values) => {
              try {
                const updated = await updateImageMutation({
                  ...values,
                  id: image.id,
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
