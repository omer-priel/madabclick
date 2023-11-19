FROM node:20.9.0

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --global yarn
RUN npm install --global pm2

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["pm2", "--name", "fronend", "start", "node_modules/next/dist/bin/next start --port 80"]
