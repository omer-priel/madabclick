#!/bin/bash

set -x #echo on

cd frontend
yarn run next-lint
yarn run prettier-lint
