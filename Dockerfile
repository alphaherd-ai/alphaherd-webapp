FROM node:18-alpine
WORKDIR  /app
COPY . ./

# Define build arguments
ARG NEXT_PUBLIC_API_BASE_PATH
ARG DATABASE_URL
ARG DIRECT_URL

# Set environment variables
ENV NEXT_PUBLIC_API_BASE_PATH=$NEXT_PUBLIC_API_BASE_PATH
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

RUN if [ -z "$DATABASE_URL" ]; then \
        echo "DATABASE_URL is not set."; \
    else \
        echo "DATABASE_URL is set to: $DATABASE_URL"; \
    fi

RUN if [ -z "$NEXT_PUBLIC_API_BASE_PATH" ]; then \
    echo "NEXT_PUBLIC_API_BASE_PATH is not set."; \
else \
    echo "NEXT_PUBLIC_API_BASE_PATH is set to: $NEXT_PUBLIC_API_BASE_PATH"; \
fi

RUN yarn

RUN npm run build