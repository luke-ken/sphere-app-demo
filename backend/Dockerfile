FROM node:20.15.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9003
CMD ["node", "./bin/www"]
