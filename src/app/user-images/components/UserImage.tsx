"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteUserImage from "../mutations/deleteUserImage"
import getUserImage from "../queries/getUserImage"

export const UserImage = ({ userImageId }: { userImageId: number }) => {
  const router = useRouter()
  const [deleteUserImageMutation] = useMutation(deleteUserImage)
  const [userImage] = useQuery(getUserImage, { id: userImageId })

  return (
    <>
      <div>
        <h1>Project {userImage.id}</h1>
        <pre>{JSON.stringify(userImage, null, 2)}</pre>

        <Link href={`/userImages/${userImage.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserImageMutation({ id: userImage.id })
              router.push("/userImages")
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
