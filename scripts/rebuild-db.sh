#!/bin/bash

MONGO_URI=mongodb://root:password@localhost:27017/

docker-compose down -v
docker-compose up -d
