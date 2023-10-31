#!/bin/bash

# Start the server
cd /var/frontend

pm2 delete all
pm2 --name fronend start "node_modules/next/dist/bin/next start --port 80"
