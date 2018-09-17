FROM node:10.10.0-alpine as base
LABEL mantainer='Yuriy Nagaev'

FROM node:10.10.0-alpine AS build
WORKDIR /src
COPY . .
RUN yarn install && yarn prod

FROM build AS package
RUN yarn package

FROM base AS final
COPY --from=package /src/dist.tgz /tmp

RUN mkdir /var/www \
    && tar -xvzf /tmp/dist.tgz -C /var/www/ \
    && rm /tmp/dist.tgz \
    && cd /var/www/package/ \
    && yarn install --production \
    && yarn cache clean

EXPOSE 80

ENTRYPOINT yarn --cwd /var/www/package/ prod:ssr
