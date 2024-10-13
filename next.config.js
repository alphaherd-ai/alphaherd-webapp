// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//    },
//   basePath: process.env.BASE_PATH,
//   env: {
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    
//   },
//   reactStrictMode: false,
//  }
 
//  module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['res.cloudinary.com'],
    },
  basePath: process.env.BASE_PATH,
  env: {
     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
     
  },
  reactStrictMode: false,
}

module.exports = nextConfig;