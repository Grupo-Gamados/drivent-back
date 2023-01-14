FROM node:16.16.0-alpine3.16 as builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY prisma ./prisma
RUN npm install
#RUN apk add openssl1.1-compat
RUN npx prisma generate
RUN npm run build

FROM node:16.16.0-alpine3.16 as runner

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY prisma ./prisma
#RUN apk add openssl1.1-compat
RUN npx prisma generate
COPY --from=builder /usr/src/app/dist .
RUN npm install pm2 -g
EXPOSE 4000

CMD ["pm2-runtime", "server.js"]
