import createMiddleware from 'next-intl/middleware';

import { LOCALES } from '@/config';

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: 'he',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
