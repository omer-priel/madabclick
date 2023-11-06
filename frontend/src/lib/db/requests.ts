import { DynamoDB } from "aws-sdk"

import { getConfig } from "@/config"

// client connection
function getDBClient(): DynamoDB.DocumentClient {
  const dbClient = new DynamoDB.DocumentClient({
    endpoint: getConfig().DYNAMO_END_POINT,
  });

  return dbClient;
}

// requests
export async function getYoutubeDataAPIVideos() {
  const dbClient = getDBClient();

  const res = await dbClient.scan({ TableName: "YoutubeDataAPIVideos" }).promise();

  return res.Items;
}

export async function getYoutubeDataAPIPlaylists() {
  const dbClient = getDBClient();

  const res = await dbClient.scan({ TableName: "YoutubeDataAPIPlaylists" }).promise();

  return res.Items;
}
