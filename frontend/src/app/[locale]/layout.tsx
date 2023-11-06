import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { redirect } from 'next/navigation';

import { ReduxProvider } from '@/store/provider';
import { getLanguages, getTranslation, setLanguage } from '@/translation';

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
  const language = getLanguages().find((lang) => lang.locale == params.locale);

  if (language) {
    setLanguage(language);
  }

  const t = await getTranslation();

  return {
    title: t('site-title'),
    description: t('site-description'),
  };
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const language = getLanguages().find((lang) => lang.locale == locale);

  if (!language) {
    redirect('/he');
  }

  const messages = (await import(`@/messages/${language.locale}.json`)).default;

  setLanguage(language);

  return (
    <html lang={language.locale} dir={language.dir}>
      <head></head>
      <body className='ltr:text-right rtl:text-left'>
        <ReduxProvider>
          <NextIntlClientProvider locale={language.locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
