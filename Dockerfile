FROM node:lts-alpine

WORKDIR /usr/src/app

COPY dist ./dist
COPY node_modules ./node_modules
COPY package.json ./
COPY server.js ./

EXPOSE 8080

CMD ["node", "server.js"]