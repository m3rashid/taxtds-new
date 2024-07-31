FROM node:latest AS build
WORKDIR /app

COPY ./client/package.json ./
COPY ./client/yarn.lock ./
RUN yarn install 

COPY ./client/ ./
RUN yarn build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
