// /** @type {import('next').NextConfig} */
//  const nextConfig = {
//    images: {
//      domains: ['res.cloudinary.com'],
//    },
//    webpack(config) {
//      config.module.rules.push({
//        test: /\.mp3$/, // Match .mp3 files
//        type: 'asset/resource', // Handle as a resource
//        generator: {
//          filename: 'static/media/[name].[hash][ext]', // Output path for processed files
//        },
//      })
//      return config;
//    },
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
  webpack(config) {
    config.module.rules.push({
      test: /\.mp3$/, // Match .mp3 files
      type: 'asset/resource', // Handle as a resource
      generator: {
        filename: 'static/media/[name].[hash][ext]', // Output path for processed files
      },
    });

    return config;
  },
  reactStrictMode: false,
}

 module.exports = nextConfig;



