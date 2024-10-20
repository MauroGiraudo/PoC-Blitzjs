const { withBlitz } = require("@blitzjs/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  /*images: {
    formats: ["image/avif", "image/webp"],
  },*/
}

module.exports = withBlitz(nextConfig)
