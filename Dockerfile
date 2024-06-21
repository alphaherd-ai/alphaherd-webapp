FROM node:18-alpine
WORKDIR  /app
COPY package*.json ./

RUN yarn

COPY ./prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . ./

RUN npm run build