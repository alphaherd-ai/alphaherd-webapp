FROM node:18-alpine
WORKDIR  /app
COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx prisma generate

ENV NEXT_PUBLIC_API_BASE_PATH=https://alphaherd.azurewebsites.net

COPY . ./

RUN npm run build