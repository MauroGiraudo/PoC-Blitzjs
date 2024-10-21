import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserimage from "../../queries/getUserimage"
import { EditUserimage } from "../../components/EditUserimage"

type EditUserimagePageProps = {
  params: { userimageId: string }
}

export async function generateMetadata({ params }: EditUserimagePageProps): Promise<Metadata> {
  const Userimage = await invoke(getUserimage, {
    id: Number(params.userimageId),
  })
  return {
    title: `Edit Userimage ${Userimage.id} - ${Userimage.name}`,
  }
}

export default async function Page({ params }: EditUserimagePageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUserimage userimageId={Number(params.userimageId)} />
      </Suspense>
    </div>
  )
}
