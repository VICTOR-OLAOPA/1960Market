# Dockerfile for User Service
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy the rest of the application to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build


# Expose port 3001
EXPOSE 3001

# Run the application
CMD ["node", "dist/index.js"]
