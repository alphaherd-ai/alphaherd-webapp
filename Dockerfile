FROM node:18-alpine
WORKDIR  /app
COPY . ./

RUN if [ -z "$DATABASE_URL" ]; then \
        echo "DATABASE_URL is not set."; \
    else \
        echo "DATABASE_URL is set to: $DATABASE_URL"; \
    fi

RUN yarn

RUN npm run build