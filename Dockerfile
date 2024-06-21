FROM node:18-alpine
WORKDIR  /app
COPY package*.json ./

RUN yarn

RUN npx prisma generate

COPY ./prisma/schema.prisma ./prisma/

COPY . ./

RUN npm run build