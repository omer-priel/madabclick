import { google } from 'googleapis';

import { config } from '@/config';
import { Content, ContentType } from '@/lib/db/schemas';

function getContentType(link: string): ContentType {
  if (link.startsWith('https://www.youtube.com/watch?')) {
    return 'youtube';
  }

  return 'other';
}

export async function getContents() {
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
      for (let index = 1; index < values.length; index++) {
        const [language, domain, ageLevel, name, description, link] = values[index];

        const content = {
          language: language ? language : '',
          name: name ? name : '',
          domain: domain ? domain : '',
          ageLevel: ageLevel ? ageLevel : '',
          description: description ? description : '',
          link: link ? link : '',
          contentType: getContentType(link ? link : ''),
        };

        if (name.length !== '') {
          contents.push(content);
        }
      }
    }
  } catch (err) {
    console.error('Google Sheets API error:', err);
  }

  return contents;
}
