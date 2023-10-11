import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  return NextResponse.json({
    'api-urls': {
      'api/': 'Show all the API URLs',
      'api/contents/': 'Get all the contents from the Google Sheet',
    },
  });
}
