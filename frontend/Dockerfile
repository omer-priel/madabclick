FROM node:20.9.0

WORKDIR /usr/src/app

COPY . .

RUN npm install --global pm2

RUN yarn install

# RUN yarn run next-lint
# RUN yarn run prettier-lint
# RUN yarn build

EXPOSE 80

# CMD ["pm2", "--name", "fronend", "start", "node_modules/next/dist/bin/next start --port 80"]
CMD [ "node", "index.js"]
