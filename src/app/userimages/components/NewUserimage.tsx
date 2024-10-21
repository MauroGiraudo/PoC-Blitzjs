"use client"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { nanoid } from "nanoid"
import z from "zod"

type userImage = {
  name: string
  fileName: string
  userId: number
  usimage: string
}

export function New__ModelName() {
  const [createUserimageMutation] = useMutation(createUserimage)
  const router = useRouter()

  async function handleSubmit(values: userImage) {
    try {
      console.log(z)
      const client = new S3Client({
        region: "sa-east-1",
      })
      const { url, fields } = await createPresignedPost(client, {
        Bucket: "giraudonewbucket",
        Key: nanoid(),
      })
      console.log(url, fields)
      const formData = new FormData()
      Object.entries(fields).forEach(([field, value]) => {
        formData.append(field, value)
      })
      formData.append("usimage", formData.get("usimage") as string)
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })
      const textResponse = await response.text()
      console.log(textResponse)
      if (response.ok) {
        console.log("Uploaded successfully")
      } else {
        console.log("Upload failed")
      }
      const userimage = await createUserimageMutation(values)
      router.push(`/userimages/${userimage.id}`)
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <UserimageForm
      submitText="Create Userimage"
      schema={CreateUserimageSchema}
      initialValues={{
        name: "",
        userId: 0,
        fileName: "doNotTouchThis.jpg",
        usimage: "",
        //usimage: undefined,
      }}
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    />
  )
}
