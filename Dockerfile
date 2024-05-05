FROM node:22.1-bullseye

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

CMD npm run start:dev