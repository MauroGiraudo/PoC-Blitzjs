import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ImagesList } from "./components/ImagesList"

export const metadata: Metadata = {
  title: "Images",
  description: "List of images",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/images/new"}>Create Image</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ImagesList />
      </Suspense>
    </div>
  )
}
