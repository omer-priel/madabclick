#!/bin/bash

set -x #echo on

nvm use 20.9.0

bash scripts/clean.sh

cd frontend
yarn run dev
