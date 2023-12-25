import fs from 'fs';
import { google, youtube_v3 } from 'googleapis';

import { getConfig } from '@/config';

type VideosData = {
  [videoID: string]:
    | {
        allowd: true;

        channelId: string;
        title: string;
        description: string;
        thumbnail: {
          url: string;
          width: number;
          height: number;
        } | null;
      }
    | {
        allowd: false;
        notAllowedReason: string;
      };
};

type PlaylistsData = {
  [playlistID: string]:
    | {
        allowd: true;

        title: string;
        description: string;
        thumbnail: {
          url: string;
          width: number;
          height: number;
        } | null;
      }
    | {
        allowd: false;
        notAllowedReason: string;
      };
};

type YouTubeData = {
  videos: { [id: string]: youtube_v3.Schema$Video };
  playlists: { [id: string]: youtube_v3.Schema$Playlist };
};

function getStorageFilePath(): string {
  if (!fs.existsSync(getConfig().APP_STORAGE)) {
    fs.mkdirSync(getConfig().APP_STORAGE);
  }

  return `${getConfig().APP_STORAGE}/youtube-data.json`;
}

function loadYouTubeData(): YouTubeData {
  const filePath = getStorageFilePath();

  if (!fs.existsSync(filePath)) {
    return {
      videos: {},
      playlists: {},
    };
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return data;
  } catch (err) {
    console.error('YouTube data load error:', err);
    return {
      videos: {},
      playlists: {},
    };
  }
}

function saveYouTubeData(data: YouTubeData): void {
  const filePath = getStorageFilePath();

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, '\t'));
  } catch (err) {
    console.error('YouTube data save error:', err);
  }
}

export async function getYouTubeVideosData(videoIDs: string[]): Promise<VideosData> {
  const data = loadYouTubeData();

  const videos: VideosData = {};

  videoIDs = Array.from(new Set(videoIDs));

  if (videoIDs.length == 0) {
    return videos;
  }

  let missingVideoIDs = videoIDs.filter((videoID) => !data.videos[videoID]);

  const youtube = google.youtube('v3');

  try {
    while (missingVideoIDs.length > 0) {
      const response = await youtube.videos.list({
        key: getConfig().GOOGLE_API_KEY,
        id: missingVideoIDs.slice(0, 50),
        part: ['snippet', 'status'],
        maxResults: 50,
      });

      missingVideoIDs = missingVideoIDs.slice(50);

      response.data.items?.forEach((item) => {
        if (!item.id || !item.snippet || !item.status) {
          return;
        }

        data.videos[item.id] = item;
      });
    }
  } catch (err) {
    console.error('Google YouTube Data API error:', err);
  }

  saveYouTubeData(data);

  Object.keys(data.videos)
    .filter((videoID) => videoIDs.includes(videoID))
    .forEach((videoID) => {
      const item = data.videos[videoID];

      if (!item.id || !item.snippet || !item.status) {
        return;
      }

      if (!item.status.embeddable) {
        videos[item.id] = {
          allowd: false,
          notAllowedReason: 'The video is not embeddable',
        };
        return;
      }

      if (item.status.privacyStatus !== 'public') {
        videos[item.id] = {
          allowd: false,
          notAllowedReason: `The video is ${item.status.privacyStatus}`,
        };
        return;
      }

      if (!item.snippet.title) {
        videos[item.id] = {
          allowd: false,
          notAllowedReason: 'The video do not have title',
        };
        return;
      }

      if (!item.snippet.thumbnails) {
        videos[item.id] = {
          allowd: true,
          channelId: item.snippet.channelId ? item.snippet.channelId : '',
          title: item.snippet.title,
          description: item.snippet.description ? item.snippet.description : '',
          thumbnail: null,
        };
        return;
      }

      const thumbnails = [
        item.snippet.thumbnails.high,
        item.snippet.thumbnails.maxres,
        item.snippet.thumbnails.standard,
        item.snippet.thumbnails.default,
      ];

      while (thumbnails.length > 0 && !(thumbnails[0] && thumbnails[0]?.url && thumbnails[0].width && thumbnails[0].height)) {
        thumbnails.shift();
      }

      if (thumbnails.length > 0 && thumbnails[0] && thumbnails[0]?.url && thumbnails[0].width && thumbnails[0].height) {
        videos[item.id] = {
          allowd: true,
          channelId: item.snippet.channelId ? item.snippet.channelId : '',
          title: item.snippet.title,
          description: item.snippet.description ? item.snippet.description : '',
          thumbnail: {
            url: thumbnails[0].url,
            width: thumbnails[0].width,
            height: thumbnails[0].height,
          },
        };
      }
    });

  return videos;
}

export async function getYouTubePlaylistsData(playlistIDs: string[]): Promise<PlaylistsData> {
  const data = loadYouTubeData();

  const playlists: PlaylistsData = {};

  playlistIDs = Array.from(new Set(playlistIDs));

  if (playlistIDs.length == 0) {
    return playlists;
  }

  let missingPlaylistIDs = playlistIDs.filter((playlistID) => !data.playlists[playlistID]);

  const youtube = google.youtube('v3');

  try {
    while (missingPlaylistIDs.length > 0) {
      const response = await youtube.playlists.list({
        key: getConfig().GOOGLE_API_KEY,
        id: missingPlaylistIDs.slice(0, 50),
        part: ['snippet', 'status'],
        maxResults: 50,
      });

      missingPlaylistIDs = missingPlaylistIDs.slice(50);

      response.data.items?.forEach((item) => {
        if (!item.id || !item.snippet || !item.status) {
          return;
        }

        data.playlists[item.id] = item;
      });
    }
  } catch (err) {
    console.error('Google YouTube Data API error:', err);
  }

  saveYouTubeData(data);

  Object.keys(data.playlists)
    .filter((playlistID) => playlistIDs.includes(playlistID))
    .forEach((playlistID) => {
      const item = data.playlists[playlistID];

      if (!item.id || !item.snippet || !item.status) {
        return;
      }

      if (!item.snippet.title) {
        playlists[item.id] = {
          allowd: false,
          notAllowedReason: 'The playlist do not have title',
        };
        return;
      }

      if (item.status.privacyStatus !== 'public') {
        playlists[item.id] = {
          allowd: false,
          notAllowedReason: `The playlist is ${item.status.privacyStatus}`,
        };
        return;
      }

      let thumbnail = null;

      if (item.snippet.thumbnails) {
        const thumbnails = [
          item.snippet.thumbnails.high,
          item.snippet.thumbnails.maxres,
          item.snippet.thumbnails.standard,
          item.snippet.thumbnails.default,
        ];

        while (thumbnails.length > 0 && !(thumbnails[0] && thumbnails[0]?.url && thumbnails[0].width && thumbnails[0].height)) {
          thumbnails.shift();
        }

        if (thumbnails.length > 0 && thumbnails[0] && thumbnails[0]?.url && thumbnails[0].width && thumbnails[0].height) {
          thumbnail = {
            url: thumbnails[0].url,
            width: thumbnails[0].width,
            height: thumbnails[0].height,
          };
        }
      }

      playlists[item.id] = {
        allowd: true,
        title: item.snippet.title,
        description: item.snippet.description ? item.snippet.description : '',
        thumbnail,
      };
    });

  return playlists;
}
