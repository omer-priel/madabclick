#!/bin/bash

set -x #echo on

nvm use 20.9.0

cd frontend

pm2 delete all