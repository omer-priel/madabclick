import { google } from 'googleapis';

import { LANGUAGES, config } from '@/config';
import { Content, ContentsMetadata, ContentsSchema, Language } from '@/lib/db/schemas';

export function mapIDToLanguage(id: string): Language {
  const found = LANGUAGES.filter((language) => language.id === id);

  if (found.length == 0) {
    return {
      id: 'he',
      label: 'עברית',
    };
  }

  return found[0];
}

function mapLabelToLanguage(label: string): Language {
  const found = LANGUAGES.filter((language) => language.label === label);

  if (found.length == 0) {
    return {
      id: 'he',
      label: 'עברית',
    };
  }

  return found[0];
}

function getContentsMetadataFromValues(values: string[][] | null | undefined): ContentsMetadata {
  const metadata: ContentsMetadata = {
    languages: LANGUAGES,
    domains: {},
    ageLevels: {},
    durations: {},
  };

  if (values) {
    for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
      const [
        domainKey = '',
        domainHe = '',
        domainEn = '',
        domainAr = '',
        ,
        ageLevelKey = '',
        ageLevelHe = '',
        ageLevelEn = '',
        ageLevelAr = '',
        ,
        durationKey = '',
        durationHe = '',
        durationEn = '',
        durationAr = '',
      ] = values[rowIndex];

      if (domainKey) {
        metadata.domains[domainKey] = {
          key: domainKey,
          orderIndex: Object.keys(metadata.domains).length,
          he: domainHe,
          en: domainEn,
          ar: domainAr,
        };
      }

      if (ageLevelKey) {
        metadata.ageLevels[ageLevelKey] = {
          key: ageLevelKey,
          orderIndex: Object.keys(metadata.ageLevels).length,
          he: ageLevelHe,
          en: ageLevelEn,
          ar: ageLevelAr,
        };
      }

      if (durationKey) {
        metadata.durations[durationKey] = {
          key: durationKey,
          orderIndex: Object.keys(metadata.durations).length,
          he: durationHe,
          en: durationEn,
          ar: durationAr,
        };
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
  duration: string
): Content {
  const content = {
    index,
    language: mapLabelToLanguage(language),
    domain: metadata.domains[domain],
    ageLevel: metadata.ageLevels[ageLevel],
    duration: metadata.durations[duration],
    name,
    link,
  };

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

    return {
      ...content,
      contentType: 'youtube',
      videoID: videoID,
      playlistID: playlistID,
    };
  }

  return {
    ...content,
    contentType: 'other',
  };
}

function getContentsDataFromValues(metadata: ContentsMetadata, values: string[][]): Content[] {
  const contents: Content[] = [];

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const [language = '', domain = '', ageLevel = '', name = '', , link = '', duration = ''] = values[rowIndex];

    if (language.trim() && domain.trim() && ageLevel.trim() && name.trim() && link.trim() && duration.trim()) {
      contents.push(
        getContent(metadata, contents.length, language.trim(), domain.trim(), ageLevel.trim(), name.trim(), link.trim(), duration.trim())
      );
    }
  }

  return contents;
}

export async function getContentsInfo(): Promise<ContentsSchema> {
  const sheets = google.sheets('v4');

  let metadata = getContentsMetadataFromValues(null);
  let contents: Content[] = [];

  try {
    const translationsResponse = await sheets.spreadsheets.values.get({
      key: config.GOOGLE_API_KEY,
      spreadsheetId: config.GOOGLE_SPREADSHEET_ID_CONTENTS,
      range: 'translations!A:N',
    });

    const contentsResponse = await sheets.spreadsheets.values.get({
      key: config.GOOGLE_API_KEY,
      spreadsheetId: config.GOOGLE_SPREADSHEET_ID_CONTENTS,
      range: 'contents!A:G',
    });

    const translationsValues = translationsResponse.data.values;
    const contentsValues = contentsResponse.data.values;

    if (translationsValues && contentsValues) {
      metadata = getContentsMetadataFromValues(translationsValues);
      contents = getContentsDataFromValues(metadata, contentsValues);
    }
  } catch (err) {
    console.error('Google Sheets API error:', err);
  }

  return {
    ...metadata,
    contents,
  };
}
