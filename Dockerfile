# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built assets from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"] 