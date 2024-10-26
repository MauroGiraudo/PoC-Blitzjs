"use client"
import { CreateUserimageSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createUserimage from "../mutations/createUserimage"
import { useRouter } from "next/navigation"
import { ChangeEvent, SetStateAction, useState } from "react"
import styles from "src/app/styles/NewUserimage.module.css"
import Image from "next/image"
import homeStyles from "src/app/styles/Home.module.css"
import { getAntiCSRFToken } from "@blitzjs/auth"

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
            if (relation !== 1) {
              img.width = NORMALIZE_SIZE * relation
              img.height = NORMALIZE_SIZE
            } else {
              img.height = NORMALIZE_SIZE
              img.width = NORMALIZE_SIZE
            }
          }
          setImageDimensions({ width: img.width, height: img.height })
          console.log(img.width, img.height)
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
      if (!file) {
        throw Error("No se ha seleccionado un archivo")
      }
      const formData = new FormData()
      formData.append("image", file, file.name)

      const nameInput = document.getElementById("name") as HTMLInputElement
      const name = nameInput.value

      const fileName = Date.now() + "-" + file.name
      formData.append("fileName", fileName)

      const antiCSRFToken = getAntiCSRFToken()
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
        headers: {
          "Anti-Csrf": antiCSRFToken,
        },
      })
      const result = await response.json()
      console.log(result)

      const values = {
        name: name,
        fileName: fileName,
        imageHeight: imageDimensions?.height || 200,
        imageWidth: imageDimensions?.width || 250,
      }
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
    <div className={styles.imageList}>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleImageSubmit}
        className={styles.imageListItem}
      >
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
        <button type="submit" className={homeStyles.button}>
          <strong>Publicar Imagen</strong>
        </button>
      </form>
    </div>
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
