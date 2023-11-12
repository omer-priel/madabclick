import { ObjectId } from 'mongodb';

export enum YoutubeDataVideoState {
  Unloaded = 0,
  Loaded = 1,
  Error = 2,
}

export enum YoutubeDataPlaylistState {
  Unloaded = 0,
  Loaded = 1,
  Error = 2,
}

export interface ThumbnailData {
  url: string;
  width: number | null;
  height: number | null;
}

export interface YoutubeDataVideo {
  _id: string;
  playlistId: string | null;
  state: YoutubeDataVideoState;
  payload: string;
  errorMessage: string;
}

export interface YoutubeDataPlaylist {
  _id: string;
  state: YoutubeDataPlaylistState;
  payload: string;
  errorMessage: string;
}

export interface Content {
  _id: ObjectId;
  language: string;
  domain: string;
  ageLevel: string;
  duration: string;
  name: string;
  link: string;
  recommended: boolean;

  title: string;

  hide: boolean;
  allowed: boolean;
  notAllowedReason: string;

  youtube: {
    videoId: string;
    loaded: boolean;
    title: string | null;
    description: string | null;

    thumbnail: ThumbnailData;

    playlist: {
      playlistId: string;
      loaded: boolean;
      title: string | null;
      description: string | null;

      thumbnail: ThumbnailData | null;
    } | null;
  } | null;
}
