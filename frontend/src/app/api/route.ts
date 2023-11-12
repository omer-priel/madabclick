import { NextResponse } from 'next/server';

import { getContentsInfo } from '@/lib/api/requests';
import { getLanguages } from '@/translation';

export const revalidate = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const languages = getLanguages();

  const res = {
    he: await getContentsInfo(languages.he),
    en: await getContentsInfo(languages.en),
    ar: await getContentsInfo(languages.ar),
  };

  return NextResponse.json(res);
}
