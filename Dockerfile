FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm install -D typescript ts-node nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]