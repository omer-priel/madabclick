FROM node:20.9.0

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn run next-lint
RUN yarn run prettier-lint
RUN yarn build

EXPOSE 8080

ENTRYPOINT ["node_modules/next/dist/bin/next", "start", "--port", "8080"]
