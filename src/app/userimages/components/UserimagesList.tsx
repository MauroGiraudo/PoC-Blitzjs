"use client"
import { usePaginatedQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import getUserimages from "../queries/getUserimages"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { Route } from "next"
import styles from "./../../styles/NewUserimage.module.css"
import Image from "next/image"

const ITEMS_PER_PAGE = 5

export const UserimagesList = () => {
  const searchparams = useSearchParams()!
  const page = Number(searchparams.get("page")) || 0
  const [{ userimages, hasMore }] = usePaginatedQuery(getUserimages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const router = useRouter()
  const pathname = usePathname()

  const goToPreviousPage = () => {
    const params = new URLSearchParams(searchparams)
    params.set("page", (page - 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }
  const goToNextPage = () => {
    const params = new URLSearchParams(searchparams)
    params.set("page", (page + 1).toString())
    router.push((pathname + "?" + params.toString()) as Route)
  }

  return (
    <div>
      <ul className={styles.imageList}>
        {userimages.map((userimage) => (
          <li key={userimage.id} className={styles.imageListItem}>
            <div>
              <Link href={`/userimages/${userimage.id}`}>
                <label className={styles.imageName}>{userimage.name}</label>
              </Link>
              <br />
              <br />
              <Link href={`/userimages/${userimage.id}`}>
                <Image
                  src={`/uploads/${userimage.fileName}`}
                  alt={"Esto es una imagen"}
                  height={200}
                  width={200}
                ></Image>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <button className={styles.imageListButton} disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button className={styles.imageListButton} disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}
