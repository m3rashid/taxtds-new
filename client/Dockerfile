FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN  (rm -rf /app/build || true) && yarn build

ENTRYPOINT ["yarn", "prod"]
