#!/bin/bash

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

nvm use

set -x #echo on

cd frontend
yarn run next-fix
yarn run prettier-fix
