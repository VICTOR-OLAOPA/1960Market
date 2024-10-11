# Dockerfile for API Gateway
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

RUN tsc

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
