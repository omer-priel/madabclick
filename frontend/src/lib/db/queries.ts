import { Collection } from 'mongodb';

import { getDBClient } from '@/lib/db/manager';
import { YoutubeDataPlaylist, YoutubeDataVideo } from '@/lib/db/schemas';

export async function getYoutubeDataVideos(): Promise<YoutubeDataVideo[]> {
  let videos: YoutubeDataVideo[] = [];

  const { client, db } = await getDBClient();

  try {
    const collection: Collection<YoutubeDataVideo> = db.collection('youtubeDataVideos');
    const cursor = collection.find({});

    videos = await cursor.toArray();

    client.close();
  } catch (error) {
    client.close();

    throw error;
  }

  return videos;
}

export async function getYoutubeDataPlaylists(): Promise<YoutubeDataPlaylist[]> {
  let playlists: YoutubeDataPlaylist[] = [];

  const { client, db } = await getDBClient();

  try {
    const collection: Collection<YoutubeDataPlaylist> = db.collection('youtubeDataPlaylists');
    const cursor = collection.find({});

    playlists = await cursor.toArray();

    client.close();
  } catch (error) {
    client.close();

    throw error;
  }

  return playlists;
}
