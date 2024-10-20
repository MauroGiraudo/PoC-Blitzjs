import { Metadata } from "next"
import { Suspense } from "react"
import { New__ModelName } from "../components/NewUserimage"

export const metadata: Metadata = {
  title: "New Image",
  description: "Upload a new image",
}

export default async function Page() {
  return (
    <div>
      <h1>Upload a new image</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__ModelName />
      </Suspense>
    </div>
  )
}
