import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { LANGUAGES } from '@/config';
import { getTranslation, setLocale } from '@/translation';

import '@/styles/globals.css';

export interface PageProps {
  params: {
    locale: string;
  };
}

interface Props extends PageProps {
  children: ReactNode;
}

export async function generateMetadata({ params }: PageProps) {
  setLocale(params.locale);

  const t = await getTranslation();

  return {
    title: t('site-title'),
    description: t('site-description'),
  };
}

export function generateStaticParams() {
  return Array.from(
    LANGUAGES.map((language) => {
      return { locale: language.locale };
    })
  );
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  setLocale(locale);

  // render layout
  return (
    <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
