import { google } from 'googleapis';

import { config } from '@/config';

type VideosData = {
  [videoID: string]: {
    title: string;
    description: string;
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
};

type PlaylistsData = {
  [playlistID: string]: {
    title: string;
    description: string;
    thumbnail: {
      url: string;
      width: number;
      height: number;
    } | null;
  };
};

export async function getYouTubeVideosData(videoIDs: string[]): Promise<VideosData> {
  const videos: VideosData = {};

  videoIDs = Array.from(new Set(videoIDs));

  if (videoIDs.length == 0) {
    return videos;
  }

  const youtube = google.youtube('v3');

  try {
    while (videoIDs.length > 0) {
      const response = await youtube.videos.list({
        key: config.GOOGLE_API_KEY,
        id: videoIDs.slice(0, 50),
        part: ['snippet'],
        maxResults: 50,
      });

      videoIDs = videoIDs.slice(50);

      response.data.items?.forEach((item) => {
        if (!item.id || !item.snippet || !item.snippet.thumbnails) {
          return;
        }

        if (!(item.snippet.title || item.snippet.title === '') || !(item.snippet.description || item.snippet.description === '')) {
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
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: {
              url: thumbnails[0].url,
              width: thumbnails[0].width,
              height: thumbnails[0].height,
            },
          };
        }
      });
    }
  } catch (err) {
    console.error('Google YouTube Data API error:', err);
  }

  return videos;
}

export async function getYouTubePlaylistsData(playlistIDs: string[]): Promise<PlaylistsData> {
  const playlists: PlaylistsData = {};

  playlistIDs = Array.from(new Set(playlistIDs));

  if (playlistIDs.length == 0) {
    return playlists;
  }

  const youtube = google.youtube('v3');

  try {
    while (playlistIDs.length > 0) {
      const response = await youtube.playlists.list({
        key: config.GOOGLE_API_KEY,
        id: playlistIDs.slice(0, 50),
        part: ['snippet'],
        maxResults: 50,
      });

      playlistIDs = playlistIDs.slice(50);

      response.data.items?.forEach((item) => {
        if (!item.id || !item.snippet) {
          return;
        }

        if (!(item.snippet.title || item.snippet.title === '') || !(item.snippet.description || item.snippet.description === '')) {
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
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail,
        };
      });
    }
  } catch (err) {
    console.error('Google YouTube Data API error:', err);
  }

  return playlists;
}
