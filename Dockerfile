FROM node:lts AS base

RUN apt-get update && apt-get -y install autoconf gcc make

WORKDIR /app

FROM base AS staging-build
COPY package-lock.json package-lock.json
COPY package/package.json package/package.json
COPY package.json package.json
RUN npm ci

COPY docs docs
COPY filters filters
COPY src src
COPY package package
COPY shortcodes shortcodes
COPY .eleventy.js .eleventy.js
COPY .eleventyignore .eleventyignore
COPY gulp gulp
COPY gulpfile.js gulpfile.js
COPY postcss.config.mjs postcss.config.mjs
COPY README.md README.md

RUN ENV="staging" npm run build:package
RUN ENV="staging" npm run build:docs

FROM base AS preview-build
COPY package-lock.json package-lock.json
COPY package/package.json package/package.json
COPY package.json package.json
RUN npm ci

COPY docs docs
COPY filters filters
COPY src src
COPY package package
COPY shortcodes shortcodes
COPY .eleventy.js .eleventy.js
COPY .eleventyignore .eleventyignore
COPY gulp gulp
COPY gulpfile.js gulpfile.js
COPY postcss.config.mjs postcss.config.mjs
COPY README.md README.md

RUN ENV="staging" npm run build:package
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

RUN npm install
RUN ENV="production" npm run build:package
RUN ENV="production" npm run build:docs

RUN rm /root/.ssh/id_rsa

FROM nginxinc/nginx-unprivileged:alpine AS staging
EXPOSE 3000
COPY docker/htpasswd /etc/nginx/.htpasswd
COPY docker/nginx-staging.conf /etc/nginx/conf.d/default.conf
COPY --from=staging-build /app/public /usr/share/nginx/html
COPY robots.txt /usr/share/nginx/html

FROM nginxinc/nginx-unprivileged:alpine AS preview
EXPOSE 3000
COPY docker/htpasswd-preview /etc/nginx/.htpasswd
COPY docker/nginx-preview.conf /etc/nginx/conf.d/default.conf
COPY --from=preview-build /app/public /usr/share/nginx/html
COPY robots.txt /usr/share/nginx/html

FROM nginxinc/nginx-unprivileged:alpine AS production
EXPOSE 3000
COPY docker/nginx-production.conf /etc/nginx/conf.d/default.conf
COPY --from=production-build /app/public /usr/share/nginx/html
COPY robots.txt /usr/share/nginx/html

FROM base AS staging-express-app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src src
COPY app.js app.js
COPY config.js config.js
COPY filters filters
COPY helpers helpers
COPY schema schema
COPY middleware middleware
COPY routes routes
COPY views views
COPY --from=staging-build /app/public public
ENV ENV=staging
# run express app as a non root user
RUN useradd -u 1001 -m nonrootuser
USER 1001
EXPOSE 3001
CMD ["node", "app.js"]

FROM base AS preview-express-app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src src
COPY app.js app.js
COPY config.js config.js
COPY filters filters
COPY helpers helpers
COPY schema schema
COPY middleware middleware
COPY routes routes
COPY views views
COPY --from=preview-build /app/public public
ENV ENV=staging
# run express app as a non root user
RUN useradd -u 1001 -m nonrootuser
USER 1001
EXPOSE 3001
CMD ["node", "app.js"]

FROM base AS production-express-app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src src
COPY app.js app.js
COPY config.js config.js
COPY filters filters
COPY helpers helpers
COPY schema schema
COPY middleware middleware
COPY routes routes
COPY views views
COPY --from=production-build /app/public public
ENV ENV=production
# run express app as a non root user
RUN useradd -u 1001 -m nonrootuser
USER 1001
EXPOSE 3001
CMD ["node", "app.js"]
