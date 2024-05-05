FROM node:22.1-bullseye

WORKDIR /app
COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD pnpm run start:dev