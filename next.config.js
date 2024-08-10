/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
      domains: ['res.cloudinary.com'],
    },
  basePath: process.env.BASE_PATH,
  env: {
     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
     
  },
  reactStrictMode: false,
}
=======
    domains: ['res.cloudinary.com'],
  }
};
>>>>>>> 6c1963b0b94725cc5649cac57e3cda1c8e584708

module.exports = nextConfig;