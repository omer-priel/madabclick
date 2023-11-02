#!/bin/bash

whoami

# Create the NVM directory
mkdir "/.nvm"
export NVM_DIR="/.nvm"
export NODE_VERSION="20.9.0"

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
source $NVM_DIR/nvm.sh

# Install Node.js and set it as the default version
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION
nvm use default

# Set Node.js environment variables
export NODE_PATH="$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules"
export PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# Add nvm to /etc/bashrc
echo '' | tee -a /etc/bashrc
echo 'export NVM_DIR="/.nvm"' | tee -a /etc/bashrc
echo 'export NODE_VERSION="20.9.0"' | tee -a /etc/bashrc
echo 'export NODE_PATH="$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules"' | tee -a /etc/bashrc
echo 'export PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"' | tee -a /etc/bashrc

echo '' | tee -a /etc/bashrc
echo 'source "$NVM_DIR/nvm.sh"' | tee -a /etc/bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' | tee -a /etc/bashrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' | tee -a /etc/bashrc
echo 'nvm use default' | tee -a /etc/bashrc

# Add loading of Environment Variables from SSM
echo '' | tee -a /etc/bashrc
echo 'AWS=`which aws`' | tee -a /etc/bashrc
echo 'SSM_TAGS=$(echo $($AWS ssm get-parameters-by-path --with-decryption --path /frontend/env))' | tee -a /etc/bashrc

echo 'for key in $(echo $SSM_TAGS | /usr/bin/jq -r ".[][].Name"); do' | tee -a /etc/bashrc
echo '    value=$(echo $SSM_TAGS | /usr/bin/jq -r ".[][] | select(.Name==\"$key\") | .Value");' | tee -a /etc/bashrc
echo '    key=$(echo "$(basename "$key")" | /usr/bin/tr ':' '_' | /usr/bin/tr '-' '_' | /usr/bin/tr '[:lower:]' '[:upper:]');' | tee -a /etc/bashrc
echo '    export "$key=$value"' | tee -a /etc/bashrc
echo 'done' | tee -a /etc/bashrc

# Install yarn
npm install --global yarn

# Install pm2
npm install --global pm2

# Install httpd for basic HTTP server
yum update -y
yum install -y httpd

# Print versions
echo Print versions of: nvm, node, npm, yarn, pm2
nvm --version
node -v
npm -v
yarn -v
pm2 -v -s
