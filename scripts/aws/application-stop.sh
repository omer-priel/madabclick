export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 20.9.0

node -v
yarn -v

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
