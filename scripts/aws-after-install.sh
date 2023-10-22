#!/bin/bash

cd /var/frontend/

rm -rf node_modules/
yarn install

yarn build
