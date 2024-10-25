import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { UserimagesList } from "./components/UserimagesList"
import styles from "./../styles/Home.module.css"
import userimagesStyles from "./../styles/NewUserimage.module.css"

export const metadata: Metadata = {
  title: "Userimages",
  description: "List of userimages",
}

export default function Page() {
  return (
    <div className={userimagesStyles.pageImageListContainer}>
      <div className={userimagesStyles.imageListContainer}>
        <h1 className={userimagesStyles.imageName}>List of Images</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <UserimagesList />
          <br />
          <Link href={"/userimages/new"} className={styles.button}>
            Create Userimage
          </Link>
          <br />
          <Link href={"/"} className={styles.button}>
            Go Back to Main Menu
          </Link>
          <br />
        </Suspense>
      </div>
    </div>
  )
}
