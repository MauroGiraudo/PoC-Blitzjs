"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteUserimage from "../mutations/deleteUserimage"
import getUserimage from "../queries/getUserimage"
import Image from "next/image"
import android_9s from "public/images/9S.jpg"

/*
function myImageLoader({ src, width, quality }: { src: string; width?: number; quality?: number }) {
  return `D:\\Mauro\\Colegio_Facultad\\UTN\\3ero\\Desarrollo_de_Software\\PoC-Blitzjs\\public\\images\\${src}?w=${width}&q=${
    quality || 75
  }`
}
*/

// <Image src={`/image/${userimage.url}`} alt={"userimage"} width={200} height={200}></Image>

export const Userimage = ({ userimageId }: { userimageId: number }) => {
  const router = useRouter()
  const [deleteUserimageMutation] = useMutation(deleteUserimage)
  const [userimage] = useQuery(getUserimage, { id: userimageId })

  return (
    <>
      <div>
        <h1>Image {userimage.id}</h1>
        <pre>{JSON.stringify(userimage, null, 2)}</pre>

        <div style={{ display: "flex" }}>
          <Image
            alt={"Esto es una imagen"}
            src={`/images/${userimage.url}`}
            width={200}
            height={200}
          />
        </div>

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
