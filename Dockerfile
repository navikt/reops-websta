FROM gcr.io/distroless/nodejs22-debian12

COPY . .

EXPOSE 8080

CMD node server.js