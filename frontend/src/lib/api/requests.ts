import { google } from 'googleapis';

import { getConfig } from '@/config';
import { Content, ContentsSchema } from '@/lib/api/schemas';
import { getYouTubePlaylistsData, getYouTubeVideosData } from '@/lib/api/youTubeData';
import { LANGUAGES } from '@/translation';

interface ContentsMetadata {
  domains: string[];
  domainsKeys: { [key: string]: string };
  ageLevels: string[];
  ageLevelsKeys: { [key: string]: string };
  durations: string[];
  durationsKeys: { [key: string]: string };
  languages: string[];
  languagesKeys: { [key: string]: string };
}

function getContentsMetadataFromValues(values: string[][] | null | undefined, locale: string): ContentsMetadata {
  const metadata: ContentsMetadata = {
    domains: [],
    domainsKeys: {},
    ageLevels: [],
    ageLevelsKeys: {},
    durations: [],
    durationsKeys: {},
    languages: [],
    languagesKeys: {},
  };

  let addIndex = 1;
  switch (locale) {
    case 'he':
      addIndex = 1;
      break;
    case 'en':
      addIndex = 2;
      break;
    case 'ar':
      addIndex = 3;
      break;
  }

  if (values) {
    for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
      if (values[rowIndex][0]) {
        const value = values[rowIndex][0 + addIndex];
        metadata.domainsKeys[values[rowIndex][0]] = value;
        metadata.domains.push(value);
      }

      if (values[rowIndex][5]) {
        const value = values[rowIndex][5 + addIndex];
        metadata.ageLevelsKeys[values[rowIndex][5]] = value;
        metadata.ageLevels.push(value);
      }

      if (values[rowIndex][10]) {
        const value = values[rowIndex][10 + addIndex];
        metadata.durationsKeys[values[rowIndex][10]] = value;
        metadata.durations.push(value);
      }

      if (values[rowIndex][15]) {
        const value = values[rowIndex][15 + addIndex];
        metadata.languagesKeys[values[rowIndex][15]] = value;
        metadata.languages.push(value);
      }
    }
  }

  return metadata;
}

function getContent(
  metadata: ContentsMetadata,
  index: number,
  language: string,
  domain: string,
  ageLevel: string,
  name: string,
  link: string,
  duration: string,
  recommended: boolean
): Content {
  const content: Content = {
    index,

    language: metadata.languagesKeys[language],
    domain: metadata.domainsKeys[domain],
    ageLevel: metadata.ageLevelsKeys[ageLevel],
    duration: metadata.durationsKeys[duration],
    name,
    link,
    recommended,

    title: name,

    youtubeVideo: null,
    youtubePlaylist: null,
  };

  if (link.startsWith('https://youtu.be/')) {
    const videoID = link.split('https://youtu.be/')[1].split('?')[0];
    content.link = link = 'https://www.youtube.com/watch?v=' + videoID;
  }

  if (link.startsWith('https://www.youtube.com/')) {
    let videoID = null;
    let playlistID = null;

    if (link.startsWith('https://www.youtube.com/watch?')) {
      if (content.link.includes('?v=')) {
        videoID = content.link.split('?v=')[1].split('&')[0];
      } else {
        videoID = content.link.split('&v=')[1].split('&')[0];
      }
    }

    if (content.link.includes('?list=')) {
      playlistID = content.link.split('?list=')[1].split('&')[0];
    } else if (content.link.includes('&list=')) {
      playlistID = content.link.split('&list=')[1].split('&')[0];
    }

    if (videoID) {
      content.youtubeVideo = {
        id: videoID,
        playlistId: playlistID,
        title: null,
        description: null,
        thumbnail: {
          url: `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
          width: null,
          height: null,
        },
      };
    } else if (playlistID) {
      content.youtubePlaylist = {
        id: playlistID,
        title: null,
        description: null,
        thumbnail: null,
      };
    }
  }

  return content;
}

function getContentsDataFromValues(metadata: ContentsMetadata, values: string[][]): Content[] {
  const contents: Content[] = [];

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const [language = '', domain = '', ageLevel = '', name = '', , link = '', duration = '', recommendedValue = ''] = values[rowIndex];
    const recommended = recommendedValue == 'מומלץ';

    if (language.trim() && domain.trim() && ageLevel.trim() && link.trim() && duration.trim()) {
      contents.push(
        getContent(
          metadata,
          contents.length,
          language.trim(),
          domain.trim(),
          ageLevel.trim(),
          name.trim(),
          link.trim(),
          duration.trim(),
          recommended
        )
      );
    }
  }

  return contents;
}

export async function getContentsInfo(locale: string): Promise<ContentsSchema> {
  const sheets = google.sheets('v4');

  let metadata = getContentsMetadataFromValues(null, locale);
  let contents: Content[] = [];
  let currentLanguage = '';
  let recommendedContent = null;

  try {
    const translationsResponse = await sheets.spreadsheets.values.get({
      key: getConfig().GOOGLE_API_KEY,
      spreadsheetId: getConfig().GOOGLE_SPREADSHEET_ID_CONTENTS,
      range: 'translations!A:S',
    });

    const contentsResponse = await sheets.spreadsheets.values.get({
      key: getConfig().GOOGLE_API_KEY,
      spreadsheetId: getConfig().GOOGLE_SPREADSHEET_ID_CONTENTS,
      range: 'contents!A:H',
    });

    const translationsValues = translationsResponse.data.values;
    const contentsValues = contentsResponse.data.values;

    if (translationsValues && contentsValues) {
      metadata = getContentsMetadataFromValues(translationsValues, locale);
      contents = getContentsDataFromValues(metadata, contentsValues);

      currentLanguage = metadata.languagesKeys[LANGUAGES.filter((language) => language.locale === locale)[0].key];
    }
  } catch (err) {
    console.error('Google Sheets API error:', err);
  }

  const mapVideos = Object.fromEntries(
    contents
      .filter((content) => content.youtubeVideo !== null)
      .map((content) => [content.youtubeVideo !== null ? content.youtubeVideo.id : null, content.index])
  );

  const mapPlaylists = Object.fromEntries(
    contents
      .filter((content) => content.youtubePlaylist !== null)
      .map((content) => [content.youtubePlaylist !== null ? content.youtubePlaylist.id : null, content.index])
  );

  const videosData = await getYouTubeVideosData(Object.keys(mapVideos));
  const playlistsData = await getYouTubePlaylistsData(Object.keys(mapPlaylists));

  Object.keys(videosData).forEach((videoID) => {
    const content = contents[mapVideos[videoID]];
    if (content.youtubeVideo) {
      content.youtubeVideo = {
        ...content.youtubeVideo,
        ...videosData[videoID],
      };

      if (content.youtubeVideo.title) {
        content.title = content.youtubeVideo.title;
      }
    }
  });

  Object.keys(playlistsData).forEach((playlistID) => {
    const content = contents[mapPlaylists[playlistID]];
    if (content.youtubePlaylist) {
      content.youtubePlaylist = {
        ...content.youtubePlaylist,
        ...playlistsData[playlistID],
      };

      if (content.youtubePlaylist.title) {
        content.title = content.youtubePlaylist.title;
      }
    }
  });

  const recommendedContents = contents.filter((content) => content.recommended);

  if (recommendedContents.length > 0) {
    const recommendedIndex = Math.floor(Math.random() * recommendedContents.length);
    recommendedContent = recommendedContents[recommendedIndex];
  }

  return {
    currentLanguage,

    domains: metadata.domains,
    ageLevels: metadata.ageLevels,
    durations: metadata.durations,
    languages: metadata.languages,

    contentsTotal: contents.length,

    recommendedContent,

    contents,
  };
}
