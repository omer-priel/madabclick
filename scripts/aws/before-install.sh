
echo before-install.sh > /var/log/frontend-deployment.txt
date >> /var/log/frontend-deployment.txt

# Stop the simple http server
if [ -d "/var/www/html" ]; then
    echo "Delete httpd server" >> /var/log/frontend-deployment.txt
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
    echo "Stop fronend previous version" >> /var/log/frontend-deployment.txt
    cd /var/frontend
    pm2 delete ecosystem.config.js
    echo "Delete fronend previous version" >> /var/log/frontend-deployment.txt
    cd /
    rm -rf /var/frontend
fi

echo '' >> /var/log/frontend-deployment.txt
