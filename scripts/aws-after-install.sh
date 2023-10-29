#!/bin/bash

# Install yarn, node and yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 18.17.0
npm install --global yarn

# build frontend server
cd /var/frontend/

rm -rf node_modules/
rm -rf .next

yarn install

yarn run build
