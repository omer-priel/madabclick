import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { findDevice, useStore } from '@/store';
import { findLanguage } from '@/translation';

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

  useStore.setState({
    device: device,
  });

  const language = findLanguage(locale);

  if (!language) {
    redirect('/he');
  }

  const messages = (await import(`@/messages/${language.locale}.json`)).default;

  useStore.setState({
    language: language,
  });

  if (device === 'whatsapp') {
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
          <meta name='application-name' content='מדע בקליק' data-device={device} />
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
        <meta name='application-name' content='מדע בקליק' data-device={device} />
      </head>
      <body className='ltr:text-right rtl:text-left'>
        <NextIntlClientProvider locale={language.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
