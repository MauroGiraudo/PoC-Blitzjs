import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserImage from "../queries/getUserImage"
import { UserImage } from "../components/UserImage"

export async function generateMetadata({ params }: UserImagePageProps): Promise<Metadata> {
  const UserImage = await invoke(getUserImage, {
    id: Number(params.userImageId),
  })
  return {
    title: `UserImage ${UserImage.id} - ${UserImage.name}`,
  }
}

type UserImagePageProps = {
  params: { userImageId: string }
}

export default async function Page({ params }: UserImagePageProps) {
  return (
    <div>
      <p>
        <Link href={"/userImages"}>UserImages</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <UserImage userImageId={Number(params.userImageId)} />
      </Suspense>
    </div>
  )
}
