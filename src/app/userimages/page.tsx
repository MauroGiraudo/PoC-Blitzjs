import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { UserimagesList } from "./components/UserimagesList"

export const metadata: Metadata = {
  title: "Userimages",
  description: "List of userimages",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/userimages/new"}>Create Userimage</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <UserimagesList />
      </Suspense>
    </div>
  )
}
