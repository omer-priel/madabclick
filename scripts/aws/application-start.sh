export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm use 20.9.0

node -v
yarn -v

# Save in log
echo application-start.sh >> /var/log/frontend-deployment.txt
date >> /var/log/frontend-deployment.txt

# Start the server
cd /var/frontend
pm2 startOrRestart ecosystem.config.js
