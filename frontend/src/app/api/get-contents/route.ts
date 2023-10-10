import { google } from 'googleapis';
import { NextResponse } from 'next/server';

import { config } from '@/config';
import { Content } from '@/lib/db/schemas';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
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
        contents.push({
          language,
          name,
          domain,
          ageLevel,
          description,
          link,
        });
      }
    }
  } catch (err) {
    console.error('The API returned an error:', err);
  }

  return NextResponse.json(contents);
}
