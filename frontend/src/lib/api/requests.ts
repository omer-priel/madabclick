import { google } from 'googleapis';

import { getConfig } from '@/config';
import { Content, ContentsSchema } from '@/lib/api/schemas';
import { getYouTubePlaylistsData, getYouTubeVideosData } from '@/lib/api/youTubeData';
import { Language } from '@/translation';

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

function getContentsMetadataFromValues(values: string[][] | null | undefined, currentLanguage: Language): ContentsMetadata {
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
  switch (currentLanguage.locale) {
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

    allowed: true,
    notAllowedReason: '',

    youtube: null,
  };

  if (link.startsWith('https://youtu.be/')) {
    const videoID = link.split('https://youtu.be/')[1].split('?')[0];
    content.link = link = 'https://www.youtube.com/watch?v=' + videoID;
  }

  if (link.startsWith('https://www.youtube.com/watch?')) {
    let videoID = null;
    let playlistID = null;

    if (content.link.includes('?v=')) {
      videoID = content.link.split('?v=')[1].split('&')[0];
    } else {
      videoID = content.link.split('&v=')[1].split('&')[0];
    }

    if (content.link.includes('?list=')) {
      playlistID = content.link.split('?list=')[1].split('&')[0];
    } else if (content.link.includes('&list=')) {
      playlistID = content.link.split('&list=')[1].split('&')[0];
    }

    if (videoID) {
      content.youtube = {
        id: videoID,
        loaded: false,
        channelId: null,
        title: null,
        description: null,
        thumbnail: {
          url: `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
          width: null,
          height: null,
        },
        playlist: null,
      };

      if (playlistID) {
        content.youtube.playlist = {
          id: playlistID,
          loaded: false,
          title: null,
          description: null,
          thumbnail: null,
        };
      }
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

export async function getContentsInfo(currentLanguage: Language): Promise<ContentsSchema> {
  const sheets = google.sheets('v4');

  let metadata = getContentsMetadataFromValues(null, currentLanguage);
  let currentLanguageValue = '';
  let contents: Content[] = [];
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
      metadata = getContentsMetadataFromValues(translationsValues, currentLanguage);
      contents = getContentsDataFromValues(metadata, contentsValues);

      currentLanguageValue = metadata.languagesKeys[currentLanguage.key];
    }
  } catch (err) {
    console.error('Google Sheets API error:', err);
  }

  const mapVideos: { [id: string]: number[] } = {};
  const mapPlaylists: { [id: string]: number[] } = {};

  contents.forEach((content, index) => {
    if (content.youtube) {
      if (mapVideos.hasOwnProperty(content.youtube.id)) {
        mapVideos[content.youtube.id].push(index);
      } else {
        mapVideos[content.youtube.id] = [index];
      }

      if (content.youtube.playlist) {
        if (mapPlaylists.hasOwnProperty(content.youtube.playlist.id)) {
          mapPlaylists[content.youtube.playlist.id].push(index);
        } else {
          mapPlaylists[content.youtube.playlist.id] = [index];
        }
      }
    }
  });

  const videosData = await getYouTubeVideosData(Object.keys(mapVideos));
  const playlistsData = await getYouTubePlaylistsData(Object.keys(mapPlaylists));

  Object.keys(videosData).forEach((videoID) => {
    mapVideos[videoID].forEach((contentIndex) => {
      const content = contents[contentIndex];
      const data = videosData[videoID];

      if (!content.youtube) {
        return;
      }

      content.youtube.loaded = true;

      if (!content.allowed) {
        return;
      }

      if (!data.allowd) {
        content.allowed = false;
        content.notAllowedReason = data.notAllowedReason;
        return;
      }

      if (content.youtube) {
        content.youtube.channelId = data.channelId;
        content.youtube.title = data.title;
        content.youtube.description = data.description;

        if (data.thumbnail) {
          content.youtube.thumbnail = data.thumbnail;
        }

        if (content.youtube.title) {
          content.title = content.youtube.title;
        }
      }
    });
  });

  Object.keys(playlistsData).forEach((playlistID) => {
    mapPlaylists[playlistID].forEach((contentIndex) => {
      const content = contents[contentIndex];
      const data = playlistsData[playlistID];

      if (!content.youtube?.playlist) {
        return;
      }

      content.youtube.playlist.loaded = true;

      if (!content.allowed) {
        return;
      }

      if (!data.allowd) {
        content.allowed = false;
        content.notAllowedReason = data.notAllowedReason;
        return;
      }

      content.youtube.playlist.title = data.title;
      content.youtube.playlist.description = data.description;

      if (data.thumbnail) {
        content.youtube.playlist.thumbnail = data.thumbnail;
      }
    });
  });

  contents.forEach((content) => {
    if (content.allowed) {
      if (content.youtube && !content.youtube.loaded) {
        content.allowed = false;
        content.notAllowedReason = 'Need response from Google YouTube Data API about the video';
      } else if (content.youtube?.playlist && !content.youtube.playlist.loaded) {
        content.allowed = false;
        content.notAllowedReason = 'Need response from Google YouTube Data API about the playlist';
      }
    }
  });

  const allowedContents = contents.filter((content) => content.allowed);
  const notAllowedContents = contents.filter((content) => !content.allowed);

  const recommendedContents = allowedContents.filter((content) => content.recommended && content.language == currentLanguageValue);

  if (recommendedContents.length > 0) {
    const recommendedIndex = Math.floor(Math.random() * recommendedContents.length);
    recommendedContent = recommendedContents[recommendedIndex];
  }

  return {
    currentLanguageValue,

    domains: metadata.domains,
    ageLevels: metadata.ageLevels,
    durations: metadata.durations,
    languages: metadata.languages,

    contentsFromDBTotal: contents.length,
    contentsTotal: allowedContents.length,
    notAllowedContentsTotal: notAllowedContents.length,

    recommendedContent,

    contents: allowedContents,

    notAllowedContents: notAllowedContents,
  };
}
