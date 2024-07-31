FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN  (rm -rf /app/build || true) && yarn tsc && cp -r uploads /app/build/uploads && cp -r utils/keys /app/build/utils/keys
# && mkdir /app/build/utils/keys && node /app/build/utils/generateKeyPair.js
WORKDIR /app/build
ENTRYPOINT ["node", "/app/build/index.js"]
