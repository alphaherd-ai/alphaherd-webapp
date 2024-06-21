FROM node:18-alpine
WORKDIR  /app
COPY . ./

RUN yarn

RUN npx prisma generate

RUN npm run build