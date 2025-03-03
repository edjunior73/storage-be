FROM node:18.18.2-alpine AS build

RUN apk update && apk add curl bash && curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /var/app
ARG YARN_TIMEOUT=60000
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --network-timeout $YARN_TIMEOUT
COPY . .
RUN yarn prisma:generate && yarn build
RUN npm prune --production 

FROM node:18.18.2-alpine AS runtime
ARG VERSION="1.0.0"
ENV VERSION $VERSION
ENV NODE_ENV Stg
ENV TZ America/Sao_Paulo
WORKDIR /home/node/app
RUN apk add dumb-init
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
EXPOSE 4000
COPY --chown=node:node --from=build /var/app/node_modules ./node_modules/
COPY --chown=node:node --from=build /var/app/dist ./dist
COPY package.json prisma ./

CMD ["sh", "-c", "ls -l dist && yarn db:deploy && node dist/src/main.js"]
