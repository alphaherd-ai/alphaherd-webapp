FROM node:18-alpine
WORKDIR  /app
COPY package*.json ./
RUN npm install
RUN npx prisma db push

COPY . ./

CMD ["npm","run","dev"]