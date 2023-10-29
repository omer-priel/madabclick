#!/bin/bash

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

nvm use

set -x #echo on

bash scripts/clean.sh

cd frontend
yarn run dev
