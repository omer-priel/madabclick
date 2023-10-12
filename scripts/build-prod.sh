#!/bin/bash

set -x #echo on

bash scripts/clean.sh

cd frontend
yarn run build