# Dockerfile for Frontend (Vue.js with TypeScript)
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the Vue.js app
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
