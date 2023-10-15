import createMiddleware from 'next-intl/middleware';

import { LANGUAGES } from '@/translation';

export default createMiddleware({
  locales: LANGUAGES.map((language) => language.locale),
  defaultLocale: 'he',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
