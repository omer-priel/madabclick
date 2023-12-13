import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { Assistant, Poppins } from 'next/font/google';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import StoreInitializer from '@/components/infra/StoreInitializer';

import { cn } from '@/lib/styling';
import { findDevice, useStore } from '@/store';
import { findLanguage } from '@/translation';

import '@/styles/globals.css';

const poppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const assistantFont = Assistant({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-assistant',
});

export interface PageProps {
  params: {
    locale: string;
  };
}

interface Props extends PageProps {
  children: ReactNode;
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const language = findLanguage(locale);

  if (!language) {
    redirect('/he');
  }

  const messages = (await import(`@/messages/${language.locale}.json`)).default;

  const pathname = headers().get('x-pathname');
  const userAgent = headers().get('user-agent');

  const device = findDevice(userAgent);

  // init server store
  useStore.setState({
    device: device,
    pathname: pathname ? pathname : '',
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
          <meta name='theme-color' content='#00b2ca' />
          <meta name='msapplication-navbutton-color' content='#00b2ca' />
          <meta name='apple-mobile-web-app-status-bar-style' content='#00b2ca' />
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
        <meta name='theme-color' content='#00b2ca' />
        <meta name='msapplication-navbutton-color' content='#00b2ca' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#00b2ca' />
      </head>
      <body
        className={cn(
          'm-0 leading-normal ltr:text-right rtl:text-left min-h-screen bg-background font-poppins antialiased',
          assistantFont.variable,
          poppinsFont.variable
        )}
      >
        <StoreInitializer pathname={pathname ? pathname : ''} device={device} language={language} />
        <NextIntlClientProvider locale={language.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
