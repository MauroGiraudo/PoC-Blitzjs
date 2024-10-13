import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getImage from "../queries/getImage"
import { Image } from "../components/Image"

export async function generateMetadata({ params }: ImagePageProps): Promise<Metadata> {
  const Image = await invoke(getImage, { id: Number(params.imageId) })
  return {
    title: `Image ${Image.id} - ${Image.name}`,
  }
}

type ImagePageProps = {
  params: { imageId: string }
}

export default async function Page({ params }: ImagePageProps) {
  return (
    <div>
      <p>
        <Link href={"/images"}>Images</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Image imageId={Number(params.imageId)} />
      </Suspense>
    </div>
  )
}
