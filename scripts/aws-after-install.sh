#!/bin/bash

# Install yarn, node and yarn
if [ -d "$HOME/.nvm" ]; then
  echo "NVM is already installed."
else
  # Install NVM
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if Node.js 18.17.0 is already installed
if [ "$(nvm ls 18.17.0)" == "v18.17.0" ]; then
  echo "Node.js v18.17.0 is already installed."
else
  nvm install 18.17.0
fi

npm install --global yarn

# build frontend server
cd /var/frontend/

rm -rf node_modules/
rm -rf .next

yarn install

yarn run build
