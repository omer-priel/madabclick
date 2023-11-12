#!/bin/bash

set -x #echo on

nvm use 20.9.0

cd frontend

pm2 delete all
pm2 --name fronend start "node_modules/next/dist/bin/next start --port 3000"
