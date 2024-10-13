"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteImage from "../mutations/deleteImage"
import getImage from "../queries/getImage"

export const Image = ({ imageId }: { imageId: number }) => {
  const router = useRouter()
  const [deleteImageMutation] = useMutation(deleteImage)
  const [image] = useQuery(getImage, { id: imageId })

  return (
    <>
      <div>
        <h1>Project {image.id}</h1>
        <pre>{JSON.stringify(image, null, 2)}</pre>

        <Link href={`/images/${image.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteImageMutation({ id: image.id })
              router.push("/images")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
