import { google } from 'googleapis';

import { config } from '@/config';

interface VideosData {
  videos: {
    [videoID: string]: {
      youtube: {
        title: string;
        description: string;
      } | null;
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export async function getYouTubeVideosData(videoIDs: string[]): Promise<VideosData> {
  const data: VideosData = { videos: {} };

  videoIDs = Array.from(new Set(videoIDs));

  if (videoIDs.length == 0) {
    return data;
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
        if (!item.snippet.title || !item.snippet.description) {
          return;
        }

        const info = {
          title: item.snippet.title,
          description: item.snippet.description,
        };

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
          data.videos[item.id] = {
            youtube: info,
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

  return data;
}
