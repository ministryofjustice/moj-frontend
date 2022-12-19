FROM node:lts-slim AS build

RUN apt-get update && apt-get -y install autoconf gcc make

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY assets assets
COPY docs docs
COPY src src
COPY package package
COPY .eleventy.js .eleventy.js
COPY gulp gulp
COPY gulpfile.js gulpfile.js
COPY README.md README.md
COPY webpack.config.js webpack.config.js
RUN STAGING=1 npm run build:docs

FROM nginxinc/nginx-unprivileged:alpine AS nginx

EXPOSE 3000

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/public /usr/share/nginx/html
