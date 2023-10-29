#!/bin/bash

# Install yarn, node and yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 18.17.0
npm install --global yarn

#

echo $(which npm)
echo $(which node)
echo $(which yarn)

# build frontend server
pwd
cd /var/frontend/
pwd

rm -rf node_modules/
yarn install

yarn build

ls -l -a
