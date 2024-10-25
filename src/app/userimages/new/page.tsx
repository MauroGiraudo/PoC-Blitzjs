import { Metadata } from "next"
import { Suspense } from "react"
import { New__Userimage } from "../components/NewUserimage"
import styles from "src/app/styles/NewUserimage.module.css"
import Link from "next/link"
import homeStyles from "src/app/styles/Home.module.css"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div className={styles.pageImageListContainer}>
      <div className={styles.imageListContainer}>
        <h1 className={styles.imageName}>Upload a New Image</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <New__Userimage />
          <br />
          <br />
          <Link href={`/userimages`} className={homeStyles.button}>
            <strong>Volver</strong>
          </Link>
        </Suspense>
      </div>
    </div>
  )
}
