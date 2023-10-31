#!/bin/bash

# Stop the simple http server
if [ -d "/var/www/html" ]; then
    systemctl stop httpd
    systemctl disable httpd
    yum remove -y httpd
    yum autoremove -y
    systemctl daemon-reload
    systemctl reset-failed
    rm -rf /var/www/html
fi

# Delete the previous version
if [ -d "/var/frontend" ]; then
    cd /var/frontend
    pm2 delete all
    cd /
    rm -rf /var/frontend
fi
