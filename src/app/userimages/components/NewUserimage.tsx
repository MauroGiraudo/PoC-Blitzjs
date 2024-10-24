"use client"
import { FORM_ERROR, UserimageForm } from "./UserimageForm"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"
import { ChangeEvent, SetStateAction, useState } from "react"
import styles from "src/app/styles/NewUserimage.module.css"
import Image from "next/image"

const NORMALIZE_SIZE = 200

export function New__Userimage() {
  const [createUserimageMutation] = useMutation(createUserimage)
  const router = useRouter()
  const [isSelected, setIsSelected] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string>("/")
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(
    null
  )

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0])
    if (!e.target.files || e.target.files.length === 0) {
      setIsSelected(false)
    } else {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          if ((img.width + img.height) / 2 > NORMALIZE_SIZE) {
            const relation = img.width / img.height
            if (relation > 1) {
              img.width = NORMALIZE_SIZE * relation
              img.height = NORMALIZE_SIZE
            } else if (relation < 1) {
              img.height = NORMALIZE_SIZE * relation
              img.width = NORMALIZE_SIZE
            } else {
              img.height = NORMALIZE_SIZE
              img.width = NORMALIZE_SIZE
            }
          }
          setImageDimensions({ width: img.width, height: img.height })
        }
        img.src = e.target?.result as string
        setImageSrc(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setIsSelected(true)
    }
  }

  const handleImageSubmit = async () => {
    try {
      const file = image
      console.log(file)
      if (!file) {
        throw Error("No se ha seleccionado un archivo")
      }
      const nameInput = document.getElementById("name") as HTMLInputElement
      const name = nameInput.value
      const values = {
        name: name,
        file: file,
        imageHeight: imageDimensions?.height || 200,
        imageWidth: imageDimensions?.width || 250,
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
  }

  return (
    <form method="post" encType="multipart/form-data" onSubmit={handleImageSubmit}>
      <label>
        <strong>{`Image's Name`}</strong>
      </label>
      <br />
      <input
        className={styles.txbName}
        name="name"
        id="name"
        type="text"
        placeholder="name"
      ></input>{" "}
      <br />
      <br />
      <input
        className={styles.uploadImageInput}
        name="image"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      ></input>
      <div className={styles.imageContainer}>
        <label className={styles.lblAddImage} htmlFor="image">
          Elegir Imagen
        </label>
      </div>
      <br />
      <div className={styles.imageContainer}>
        <Image
          src={`${imageSrc}`}
          alt="Esto es una imagen"
          height={imageDimensions?.height || 200}
          width={imageDimensions?.width || 250}
          id="img"
          hidden={!isSelected}
        ></Image>
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
