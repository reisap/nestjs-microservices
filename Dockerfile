FROM node:22.1.0-bullseye-slim

WORKDIR /app

COPY . /app/

RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD pnpm run start:dev