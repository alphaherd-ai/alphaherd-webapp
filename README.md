# AlphaHerd WebApp

## 📌 Getting Started

### 🛠 Clone the Repository
Clone the main branch of the repository using SSH:
```sh
git clone <SSH_LINK>
```

Navigate into the project directory:
```sh
cd alphaherd-webapp
```

### 📦 Install Dependencies
Install project dependencies with the following command:
```sh
npm i --legacy-peer-deps
```

## ⚙️ Configuration

### Development Configuration
Modify `next.config.js` for development:
```js
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
```

### Production Configuration
Modify `next.config.js` for production:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mp3$/, // Match .mp3 files
      type: 'asset/resource', // Handle as a resource
      generator: {
        filename: 'static/media/[name].[hash][ext]', // Output path for processed files
      },
    })
    return config;
  },
}

module.exports = nextConfig;
```

## 🌍 Environment Variables
Create a `.env` file in the project root and set up the following environment variables:
```
DIRECT_URL=
DATABASE_URL=
NEXT_PUBLIC_SECRET_KEY=
BASE_PATH=
NEXT_PUBLIC_API_BASE_PATH=
AUTOMATED_GMAIL=
AUTOMATED_GMAIL_APP_PASSWORD=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

## 🚀 Running the Project
To start the development server, run:
```sh
npm run dev
```

Then, open the browser and go to:
```
http://localhost:3000/alphaherd/auth/login
```
