"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteUserimage from "../mutations/deleteUserimage"
import getUserimage from "../queries/getUserimage"
import Image from "next/image.js"
import styles from "src/app/styles/Home.module.css"
import { useSession } from "@blitzjs/auth"

export const Userimage = ({ userimageId }: { userimageId: number }) => {
  const router = useRouter()
  const [deleteUserimageMutation] = useMutation(deleteUserimage)
  const [userimage] = useQuery(getUserimage, { id: userimageId })
  const session = useSession()

  return (
    <>
      <div>
        <h1>{userimage.name}</h1>
        <pre>{JSON.stringify(userimage, null, 2)}</pre>

        <Image
          src={`/uploads/${userimage.fileName}`}
          alt="Esto es una imagen"
          width={userimage.width}
          height={userimage.height}
        />

        <br />

        <div hidden={session.userId !== userimage.userId}>
          <Link className={styles.button} href={`/userimages/${userimage.id}/edit`}>
            Edit
          </Link>

          <button
            className={styles.button}
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
      </div>
    </>
  )
}
