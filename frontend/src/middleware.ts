import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { getLanguages } from '@/translation';

const nextIntelMiddleware = createMiddleware({
  locales: getLanguages().map((language) => language.locale),
  defaultLocale: 'he',
});

export default function middleware(request: NextRequest) {
  return nextIntelMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
