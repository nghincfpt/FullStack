FROM node:18-alpine3.17

# COPY [host machine] [container]
COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm build