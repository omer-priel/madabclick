#!/bin/bash

if [ -d "/var/frontend" ]; then
    cd "/var/frontend"
    pm2 startOrRestart ecosystem.config.js
else
    systemctl enable httpd
    rm -rf /var/www/html/api
    mkdir /var/www/html/api
    mkdir /var/www/html/api/health-check
    echo "INIT: Root" > /var/www/html/index.html
    echo "INIT health-check" > /var/www/html/api/health-check/index.html
    systemctl start httpd
fi