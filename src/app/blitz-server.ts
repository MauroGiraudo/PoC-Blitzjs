import { BlitzServerMiddleware, setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import db from "db"
import { BlitzLogger } from "blitz"
import { RpcServerPlugin } from "@blitzjs/rpc"
import { authConfig } from "./blitz-auth-config"
import { uploadMiddleware } from "./userimages/new/multerConfig.js"

const { api, getBlitzContext, useAuthenticatedBlitzContext, invoke, withBlitzAuth } =
  setupBlitzServer({
    plugins: [
      AuthServerPlugin({
        ...authConfig,
        storage: PrismaStorage(db),
        isAuthorized: simpleRolesIsAuthorized,
      }),
      RpcServerPlugin({}),
      BlitzServerMiddleware(uploadMiddleware),
    ],
    logger: BlitzLogger({}),
  })

export { api, getBlitzContext, useAuthenticatedBlitzContext, invoke, withBlitzAuth }
