import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getUserimage from "../../queries/getUserimage"
import { EditUserimage } from "../../components/EditUserimage"
import Link from "next/link"
import homeStyles from "src/app/styles/Home.module.css"
import styles from "src/app/styles/NewUserimage.module.css"

type EditUserimagePageProps = {
  params: { userimageId: string }
}

export async function generateMetadata({ params }: EditUserimagePageProps): Promise<Metadata> {
  const Userimage = await invoke(getUserimage, {
    id: Number(params.userimageId),
  })
  return {
    title: `Edit Image ${Userimage.name}`,
  }
}

export default async function Page({ params }: EditUserimagePageProps) {
  return (
    <div className={styles.pageImageListContainer}>
      <div className={styles.imageListContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <EditUserimage userimageId={Number(params.userimageId)} />
          <br />
          <Link href={"/userimages"} className={homeStyles.button}>
            Go Back to Images
          </Link>
        </Suspense>
      </div>
    </div>
  )
}
