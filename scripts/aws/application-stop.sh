export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 20.9.0

node -v
yarn -v

# Stop the server

# Delete Old app

if [ -d "/var/frontend" ]; then
    if command -v pm2 &> /dev/null; then
        npx pm2 delete all
    else
        echo "pm2 is not installed."
    fi
else
    echo "/var/frontend does not exist."
fi
