## Node 8.*
FROM node:carbon
LABEL mantainer='Yuriy Nagaev'

COPY ./dist.tgz /temp/

RUN mkdir /var/www \
    && tar -xvzf /temp/dist.tgz -C /var/www/ \
    && rm /temp/dist.tgz \
    && cd /var/www/package/ \
    && yarn install --production \
    && yarn cache clean

EXPOSE 80

ENTRYPOINT yarn --cwd /var/www/package/ prod:ssr
