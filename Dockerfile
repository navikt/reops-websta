FROM node:lts-alpine

COPY . .

EXPOSE 8080

CMD node server.js