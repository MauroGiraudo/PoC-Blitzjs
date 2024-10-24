import { Metadata } from "next"
import { Suspense } from "react"
import { New__Userimage } from "../components/NewUserimage"
import styles from "src/app/styles/NewUserimage.module.css"

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
}

export default function Page() {
  return (
    <div className={styles.newUserimagePage}>
      <h1>Upload a New Image</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__Userimage />
      </Suspense>
    </div>
  )
}
