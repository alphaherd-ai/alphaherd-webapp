/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/alphaherd',
    env: {
       NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
}

module.exports = nextConfig
