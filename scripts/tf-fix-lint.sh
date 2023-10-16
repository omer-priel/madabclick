#!/bin/bash

set -x #echo on

terraform fmt
terraform validate
