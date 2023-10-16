#!/bin/bash

source .env

set -x #echo on

terraform fmt
terraform validate
