import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserimage from "../queries/getUserimage"
import { Userimage } from "../components/Userimage"
import styles from "src/app/styles/NewUserimage.module.css"
import homeStyles from "src/app/styles/Home.module.css"

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
    <div className={styles.pageImageListContainer}>
      <div className={styles.imageListContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <Userimage userimageId={Number(params.userimageId)} />
          <br />
          <Link href={"/userimages"} className={homeStyles.button}>
            Go Back to Images
          </Link>
        </Suspense>
      </div>
    </div>
  )
}
