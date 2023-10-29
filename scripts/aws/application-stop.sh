export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 20.9.0

node -v
yarn -v

# Stop the server
if [ -d "/var/frontend" ]; then
    cd /var/frontend
    pm2 delete ecosystem.config.js
    fi
else
    echo "/var/frontend does not exist."
fi
