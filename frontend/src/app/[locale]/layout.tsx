import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import StoreInitializer from '@/components/infra/StoreInitializer';

import { cn } from '@/lib/styling';
import { findDevice, useStore } from '@/store';
import { findLanguage } from '@/translation';

import '@/styles/globals.css';

const poppinsFont = localFont({
  src: [
    {
      path: '../fonts/Poppins/Poppins-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraBoldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../fonts/Poppins/Poppins-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-poppins',
});

const assistantFont = localFont({
  src: [
    {
      path: '../fonts/Assistant/static/Assistant-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Assistant/static/Assistant-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
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
      <body style={{ margin: '0px' }}>
        <div
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
        </div>
      </body>
    </html>
  );
}
