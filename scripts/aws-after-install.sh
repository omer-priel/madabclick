#!/bin/bash

export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

# nvm use 20.9.0

# node -v
# yarn -v

# # build frontend server
# cd /var/frontend/

# rm -rf node_modules/ yarn.lock
# rm -rf .next

# yarn install

# yarn run build
