FROM node:20.15.1-alpine

RUN npm install -g pnpm

RUN pnpm config set store-dir /.pnpm-store

RUN apk add git

RUN apk add openssh-client

RUN npm i -g gitmoji-cli