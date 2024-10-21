"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteUserimage from "../mutations/deleteUserimage"
import getUserimage from "../queries/getUserimage"

export const Userimage = ({ userimageId }: { userimageId: number }) => {
  const router = useRouter()
  const [deleteUserimageMutation] = useMutation(deleteUserimage)
  const [userimage] = useQuery(getUserimage, { id: userimageId })

  return (
    <>
      <div>
        <h1>Project {userimage.id}</h1>
        <pre>{JSON.stringify(userimage, null, 2)}</pre>

        <Link href={`/userimages/${userimage.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserimageMutation({ id: userimage.id })
              router.push("/userimages")
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
