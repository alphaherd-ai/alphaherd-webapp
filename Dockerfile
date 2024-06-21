FROM node:18-alpine
WORKDIR  /app
COPY . ./

RUN echo $DIRECT_URL

RUN echo $DATABASE_URL

RUN yarn

RUN npm run build