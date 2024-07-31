FROM node:latest

# RUN npm i -g yarn

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN  yarn tsc && cp -r uploads /app/build/uploads && cp -r utils/keys /app/build/utils/keys
# && mkdir /app/build/utils/keys && node /app/build/utils/generateKeyPair.js
WORKDIR /app/build
ENTRYPOINT ["node","/app/build/index.js"]





