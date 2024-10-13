import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { UserImagesList } from "./components/UserImagesList"

export const metadata: Metadata = {
  title: "UserImages",
  description: "List of userImages",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/userImages/new"}>Create UserImage</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <UserImagesList />
      </Suspense>
    </div>
  )
}
