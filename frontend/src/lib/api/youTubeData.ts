import { google } from 'googleapis';

import { getConfig } from '@/config';

type VideosData = {
  [videoID: string]:
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
        key: getConfig().GOOGLE_API_KEY,
        id: videoIDs.slice(0, 50),
        part: ['snippet', 'status'],
        maxResults: 50,
      });

      videoIDs = videoIDs.slice(50);

      response.data.items?.forEach((item) => {
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
        key: getConfig().GOOGLE_API_KEY,
        id: playlistIDs.slice(0, 50),
        part: ['snippet', 'status'],
        maxResults: 50,
      });

      playlistIDs = playlistIDs.slice(50);

      response.data.items?.forEach((item) => {
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
    }
  } catch (err) {
    console.error('Google YouTube Data API error:', err);
  }

  return playlists;
}
