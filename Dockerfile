FROM node:18-alpine
WORKDIR  /app
COPY . ./

RUN echo $DIRECT_URL

RUN echo $DATABASE_URL

RUN yarn

RUN npx prisma generate

RUN npm run build