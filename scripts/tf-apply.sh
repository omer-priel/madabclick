#!/bin/bash

set -x #echo on

cd infra

terraform fmt
terraform validate

terraform apply
