FROM node:18-alpine
WORKDIR  /app
COPY package*.json ./
COPY ./prisma/schema.prisma ./
RUN npm install --legacy-peer-deps

RUN npx prisma generate

RUN npx prisma db push

ENV NEXT_PUBLIC_API_BASE_PATH=https://alphaherd.azurewebsites.net

COPY . ./

RUN npm run build