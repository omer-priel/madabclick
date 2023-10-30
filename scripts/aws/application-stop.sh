
# Save in log
echo application-stop.sh >> /var/log/frontend-deployment.txt
date >> /var/log/frontend-deployment.txt

# Stop the simple http server
if [ -d "/var/www/html" ]; then
    echo "Stop httpd server" >> /var/log/frontend-deployment.txt
    systemctl stop httpd
fi

# Stop the server
if [ -d "/var/frontend" ]; then
    echo "Stop frontend server" >> /var/log/frontend-deployment.txt
    cd /var/frontend
    pm2 delete ecosystem.config.js
fi
