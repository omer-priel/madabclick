
echo Start Building > /tmp/example.txt

export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" >> /tmp/example.txt
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" >> /tmp/example.txt

nvm --version >> /tmp/example.txt

nvm use 20.9.0 >> /tmp/example.txt

node -v >> /tmp/example.txt
yarn -v >> /tmp/example.txt

# build frontend server
cd /var/frontend/ >> /tmp/example.txt

rm -rf node_modules/ yarn.lock >> /tmp/example.txt
rm -rf .next >> /tmp/example.txt

yarn install >> /tmp/example.txt

yarn run build >> /tmp/example.txt
