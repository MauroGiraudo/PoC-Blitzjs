import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetUserimagesInput
  extends Pick<Prisma.UserimageFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUserimagesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: userimages,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.userimage.count({ where }),
      query: (paginateArgs) => db.userimage.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      userimages,
      nextPage,
      hasMore,
      count,
    }
  }
)
