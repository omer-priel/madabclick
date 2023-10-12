import { google } from 'googleapis';

import { LANGUAGES, config } from '@/config';
import { Content, ContentsSchema, getContent } from '@/lib/db/schemas';

export async function getContentsInfo(): Promise<ContentsSchema> {
  const sheets = google.sheets('v4');

  const contents: Content[] = [];

  try {
    const response = await sheets.spreadsheets.values.get({
      key: config.GOOGLE_API_KEY,
      spreadsheetId: config.GOOGLE_SPREADSHEET_ID_CONTENTS,
      range: 'A:F',
    });

    const values = response.data.values;

    if (values) {
      for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
        const [language, domain, ageLevel, name, description, link] = values[rowIndex];

        if (name && name.trim().length !== '') {
          contents.push(getContent(contents.length, language, domain, ageLevel, name, description, link));
        }
      }
    }
  } catch (err) {
    console.error('Google Sheets API error:', err);
  }

  const domains = Array.from(new Set(contents.map((content) => content.domain))).sort();
  const ageLevels = Array.from(new Set(contents.map((content) => content.ageLevel))).sort();

  return {
    languages: LANGUAGES,
    domains,
    ageLevels,
    contents,
  };
}
