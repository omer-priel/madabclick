import createMiddleware from 'next-intl/middleware';

import { getLanguages } from '@/translation';

export default createMiddleware({
  locales: getLanguages().map((language) => language.locale),
  defaultLocale: 'he',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
