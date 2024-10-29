FROM node:lts AS base

RUN apt-get update && apt-get -y install autoconf gcc make

WORKDIR /app

FROM base AS staging-build
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .husky/install.mjs .husky/install.mjs
RUN npm ci

COPY docs docs
COPY src src
COPY package package
COPY .eleventy.js .eleventy.js
COPY gulp gulp
COPY gulpfile.js gulpfile.js
COPY README.md README.md
COPY webpack.config.js webpack.config.js

RUN ENV="staging" npm run build:docs

FROM base AS production-build
RUN apt-get -y install git
ARG GITHUB_DEPLOY_KEY
RUN mkdir /root/.ssh/
RUN echo "${GITHUB_DEPLOY_KEY}" > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN git clone git@github.com:ministryofjustice/moj-frontend.git .

run npm install
RUN ENV="staging" npm run build:docs 

RUN rm /root/.ssh/id_rsa

FROM nginxinc/nginx-unprivileged:alpine AS staging
EXPOSE 3000
COPY docker/htpasswd /etc/nginx/.htpasswd
COPY docker/nginx-staging.conf /etc/nginx/conf.d/default.conf
COPY --from=staging-build /app/public /usr/share/nginx/html

FROM nginxinc/nginx-unprivileged:alpine AS production
EXPOSE 3000
COPY docker/nginx-production.conf /etc/nginx/conf.d/default.conf
COPY --from=production-build /app/public /usr/share/nginx/html
