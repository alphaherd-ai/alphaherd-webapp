# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install Yarn (if you prefer using yarn)
RUN npm install --global yarn

# Install Redis
RUN apk add --no-cache redis

# Copy the rest of the application
COPY . .

# Define build arguments
ARG NEXT_PUBLIC_API_BASE_PATH
ARG DATABASE_URL
ARG DIRECT_URL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# Set environment variables
ENV NEXT_PUBLIC_API_BASE_PATH=$NEXT_PUBLIC_API_BASE_PATH
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=$NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# Verify environment variables
RUN if [ -z "$DATABASE_URL" ]; then \
        echo "DATABASE_URL is not set."; \
    else \
        echo "DATABASE_URL is set to: $DATABASE_URL"; \
    fi

RUN if [ -z "$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" ]; then \
        echo "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set."; \
    else \
        echo "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set to: $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"; \
    fi

RUN if [ -z "$NEXT_PUBLIC_API_BASE_PATH" ]; then \
    echo "NEXT_PUBLIC_API_BASE_PATH is not set."; \
else \
    echo "NEXT_PUBLIC_API_BASE_PATH is set to: $NEXT_PUBLIC_API_BASE_PATH"; \
fi

# Install dependencies and build the app
RUN yarn install
RUN yarn build

# Expose ports
EXPOSE 3000 6380

# Start Redis and the Node.js application
CMD redis-server --port 6380 & yarn start
