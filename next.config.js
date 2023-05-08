/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
      typedRoutes: true,
      serverComponentsExternalPackages: ["mysql2"],
    },
}

module.exports = nextConfig
