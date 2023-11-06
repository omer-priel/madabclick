#!/bin/bash

DYNAMO_ENDPOINT=http://localhost:8000

docker-compose down -v
docker-compose up -d


# Create YoutubeDataAPIVideos
aws dynamodb create-table \
  --table-name "YoutubeDataAPIVideos" \
  --attribute-definitions \
  "AttributeName=VideoID,AttributeType=S" \
  "AttributeName=Payload,AttributeType=S" \
  --key-schema "AttributeName=VideoID,KeyType=HASH" \
  --provisioned-throughput "ReadCapacityUnits=1,WriteCapacityUnits=1" \
  --endpoint-url $DYNAMO_ENDPOINT

# Create YoutubeDataAPIPlaylists
aws dynamodb create-table \
  --table-name "YoutubeDataAPIPlaylists" \
  --attribute-definitions \
  "AttributeName=PlaylistID,AttributeType=S" \
  "AttributeName=Payload,AttributeType=S" \
  --key-schema "AttributeName=PlaylistID,KeyType=HASH" \
  --provisioned-throughput "ReadCapacityUnits=1,WriteCapacityUnits=1" \
  --endpoint-url $DYNAMO_ENDPOINT
