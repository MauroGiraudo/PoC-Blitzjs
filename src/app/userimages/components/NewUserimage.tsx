"use client"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"
import { SetStateAction, useState } from "react"
import styles from "src/app/styles/NewUserimage.module.css"

export function New__Userimage() {
  const [createUserimageMutation] = useMutation(createUserimage)
  const router = useRouter()
  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={async () => {
        try {
          const fileInput = document.getElementById("image") as HTMLInputElement
          const file = fileInput.files?.[0]
          if (!file) {
            throw Error("No se ha seleccionado un archivo")
          }
          const nameInput = document.getElementById("name") as HTMLInputElement
          const name = nameInput.value
          const values = {
            name: name,
            file: file,
          }
          console.log(values)
          const userimage = await createUserimageMutation(values)
          console.log(userimage)
          if (!userimage) {
            alert("No se pudo crear la imagen")
            throw Error("No se pudo crear la imagen")
          } else {
            alert("Imagen creada")
            router.push(`/userimages/${userimage.id}`)
          }
        } catch (error: any) {
          console.log(error.message)
        }
      }}
    >
      <input
        name="name"
        id="name"
        type="text"
        placeholder="name"
        onChange={(e) => {
          console.log(e.target.value)
        }}
      ></input>{" "}
      <br />
      <br />
      <input
        className={styles.uploadImageInput}
        name="image"
        id="image"
        type="file"
        accept="images/*"
        onChange={(e) => {
          console.log(e.target.files?.[0])
        }}
      ></input>
      <div>
        <label className={styles.lblAddImage} htmlFor="image">
          Elegir Imagen
        </label>
      </div>
      <br />
      <br />
      <button type="submit">Publicar Imagen</button>
    </form>
  )
}

/*
<UserimageForm
      submitText="Create Userimage"
      schema={CreateUserimageSchema}
      encType="multipart/form-data"
      onSubmit={async (values) => {
        try {
          console.log(values)
          const userimage = await createUserimageMutation(values)
          router.push(`/userimages/${userimage.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
*/
