import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { findDevice, setDevice } from '@/devicesManager';
import { ReduxProvider } from '@/store/provider';
import { getLanguages, setLanguage } from '@/translation';

import '@/styles/globals.css';

export interface PageProps {
  params: {
    locale: string;
  };
}

interface Props extends PageProps {
  children: ReactNode;
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const userAgent = headers().get('user-agent');
  const device = findDevice(userAgent);
  setDevice(device);

  const language = getLanguages().find((lang) => lang.locale == locale);

  if (!language) {
    redirect('/he');
  }

  const messages = (await import(`@/messages/${language.locale}.json`)).default;

  setLanguage(language);

  if (device === 'whatsapp' || device === 'twitterbot') {
    return (
      <html lang={language.locale} dir={language.dir}>
        <head>
          <title>מדע בקליק</title>
          <meta name='description' content='תוכן לילדים סקרנים' />
          <meta property='og:title' content='מדע בקליק' />
          <meta property='og:description' content='תוכן לילדים סקרנים' />
          <meta property='og:url' content='http://frontend-1021899103.eu-central-1.elb.amazonaws.com/' />
          <meta property='og:image' content='http://frontend-1021899103.eu-central-1.elb.amazonaws.com/icon.png' />
          <meta property='og:type' content='website' />
          <meta property='og:locale' content='he_IL' />
          <meta property='og:locale:alternate' content='en_GB' />
          <meta property='og:locale:alternate' content='ar_AE' />
          <meta name='twitter:card' content='summary' />
        </head>
        <body></body>
      </html>
    );
  }

  return (
    <html lang={language.locale} dir={language.dir}>
      <head>
        <title>מדע בקליק</title>
        <meta name='description' content='תוכן לילדים סקרנים' />
        <meta property='og:title' content='מדע בקליק' />
        <meta property='og:description' content='תוכן לילדים סקרנים' />
        <meta property='og:url' content='http://frontend-1021899103.eu-central-1.elb.amazonaws.com/' />
        <meta property='og:image' content='http://frontend-1021899103.eu-central-1.elb.amazonaws.com/icon.png' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='he_IL' />
        <meta property='og:locale:alternate' content='en_GB' />
        <meta property='og:locale:alternate' content='ar_AE' />
        <meta name='twitter:card' content='summary' />
      </head>
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
