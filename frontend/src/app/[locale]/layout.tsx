import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { LANGUAGES } from '@/config';
import { mapIDToLanguage } from '@/lib/db/schemas';
import { getTranslation, setLocale } from '@/translation';

import '@/styles/globals.css';

export interface PageProps {
  params: { locale: string };
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
      return { locale: language.id };
    })
  );
}

export default async function RootLayout({ children, params }: Props) {
  // setup next-tran
  if (mapIDToLanguage(params.locale).id !== params.locale) {
    notFound();
  }

  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  setLocale(params.locale);

  // render layout
  return (
    <html lang={params.locale} dir={params.locale == 'en' ? 'ltr' : 'rtl'}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
