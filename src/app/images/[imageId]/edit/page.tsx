import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getImage from "../../queries/getImage"
import { EditImage } from "../../components/EditImage"

type EditImagePageProps = {
  params: { imageId: string }
}

export async function generateMetadata({ params }: EditImagePageProps): Promise<Metadata> {
  const Image = await invoke(getImage, { id: Number(params.imageId) })
  return {
    title: `Edit Image ${Image.id} - ${Image.name}`,
  }
}

export default async function Page({ params }: EditImagePageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditImage imageId={Number(params.imageId)} />
      </Suspense>
    </div>
  )
}
