import { NextResponse } from 'next/server';

import { getContentsInfo } from '@/lib/api/requests';
import { ContentsSchema } from '@/lib/api/schemas';
import { getLanguages } from '@/translation';

export const revalidate = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const res: { [key: string]: ContentsSchema } = {};

  const languages = getLanguages();

  for (let index = 0; index < languages.length; index++) {
    const language = languages[index];
    res[language.locale] = await getContentsInfo(language);
  }

  return NextResponse.json({
    ...res,
  });
}
