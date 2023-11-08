#!/bin/bash

# Start the server
cd /var/frontend

echo GOOGLE_API_KEY=$GOOGLE_API_KEY > .env.local
echo GOOGLE_SPREADSHEET_ID_CONTENTS=$GOOGLE_SPREADSHEET_ID_CONTENTS >> .env.local

pm2 delete all
pm2 --name fronend start "node_modules/next/dist/bin/next start --port 80"

# Load Static End Points
sleep 10

curl 127.0.0.1/he
curl 127.0.0.1/en
curl 127.0.0.1/ar
