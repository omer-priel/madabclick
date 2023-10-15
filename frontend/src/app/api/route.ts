import { NextResponse } from 'next/server';

import { getContentsInfo } from '@/lib/api/requests';
import { ContentsSchema } from '@/lib/api/schemas';
import { LANGUAGES } from '@/translation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const res: { [key: string]: ContentsSchema } = {};

  for (let index = 0; index < LANGUAGES.length; index++) {
    const locale = LANGUAGES[index].locale;
    res[locale] = await getContentsInfo(locale);
  }

  return NextResponse.json(res);
}
