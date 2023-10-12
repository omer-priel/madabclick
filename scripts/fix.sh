#!/bin/bash

set -x #echo on

cd frontend
yarn run next-fix
yarn run prettier-fix
