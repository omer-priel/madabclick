#!/bin/bash

set -x #echo on

nvm use 20.9.0

cd frontend
yarn run next-lint
yarn run prettier-lint
