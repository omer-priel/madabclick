import { Db, MongoClient } from 'mongodb';

import { getConfig } from '@/config';

interface MongoDBClient {
  client: MongoClient;
  db: Db;
}

export async function getDBClient(): Promise<MongoDBClient> {
  const client = new MongoClient(getConfig().MONGO_URI);

  try {
    await client.connect();

    const db = client.db(getConfig().MONGO_DB_NAME);

    return {
      client,
      db,
    };
  } catch (error) {
    client.close();
    throw error;
  }
}
