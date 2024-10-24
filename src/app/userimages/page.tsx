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
    <div className={userimagesStyles.imageListContainer}>
      <h1>List of Images</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserimagesList />
        <br />
        <Link href={"/userimages/new"} className={styles.button}>
          Create Userimage
        </Link>
      </Suspense>
    </div>
  )
}
