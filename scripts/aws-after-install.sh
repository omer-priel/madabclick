#!/bin/bash

# Install nvm
if [ -d "$HOME/.nvm" ]; then
  echo "NVM is already installed."
else
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install node and npm
if [ "$(nvm ls 20.9.0)" == "v20.9.0" ]; then
  echo "Node.js v20.9.0 is already installed."
else
  nvm install 20.9.0
fi

nvm use 20.9.0

# Install yarn
npm install --global yarn

# build frontend server
cd /var/frontend/

rm -rf node_modules/
rm -rf .next

yarn install

yarn run build
