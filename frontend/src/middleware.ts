import createMiddleware from 'next-intl/middleware';

import { LANGUAGES } from '@/config';

export default createMiddleware({
  locales: LANGUAGES.map((language) => language.id),
  defaultLocale: 'he',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
