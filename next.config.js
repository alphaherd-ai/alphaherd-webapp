/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    env: {
       NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
}

module.exports = nextConfig
