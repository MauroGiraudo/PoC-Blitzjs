import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserImage from "../../queries/getUserImage"
import { EditUserImage } from "../../components/EditUserImage"

type EditUserImagePageProps = {
  params: { userImageId: string }
}

export async function generateMetadata({ params }: EditUserImagePageProps): Promise<Metadata> {
  const UserImage = await invoke(getUserImage, {
    id: Number(params.userImageId),
  })
  return {
    title: `Edit UserImage ${UserImage.id} - ${UserImage.name}`,
  }
}

export default async function Page({ params }: EditUserImagePageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUserImage userImageId={Number(params.userImageId)} />
      </Suspense>
    </div>
  )
}
