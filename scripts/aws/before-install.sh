export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 20.9.0

node -v
yarn -v

echo before-install.sh >> /var/log/frontend-deployment.txt
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
    echo "Delete fronend previous version" >> /var/log/frontend-deployment.txt
    cd /var/frontend
    pm2 delete ecosystem.config.js
    cd /
    rm -rf /var/frontend
fi
