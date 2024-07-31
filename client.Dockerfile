FROM node:latest AS build
WORKDIR /app

COPY . .
WORKDIR /app/client

RUN yarn install && yarn build


FROM nginx:alpine

COPY --from=build /app/client/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
