import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserimage from "../queries/getUserimage"
import { Userimage } from "../components/Userimage"

export async function generateMetadata({ params }: UserimagePageProps): Promise<Metadata> {
  const Userimage = await invoke(getUserimage, {
    id: Number(params.userimageId),
  })
  return {
    title: `Userimage ${Userimage.id} - ${Userimage.name}`,
  }
}

type UserimagePageProps = {
  params: { userimageId: string }
}

export default async function Page({ params }: UserimagePageProps) {
  return (
    <div>
      <p>
        <Link href={"/userimages"}>Userimages</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Userimage userimageId={Number(params.userimageId)} />
      </Suspense>
    </div>
  )
}
