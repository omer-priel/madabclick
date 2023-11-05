'use client';

import { redirect } from 'next/navigation';

import ErrorPage from '@/components/pages/ErrorPage';

import { getConfig } from '@/config';
import { getLanguages } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Page({ error, reset }: Props) {
  const language = getLanguages().find((lang) => lang.locale == document.documentElement.lang);

  if (!language) {
    redirect('/he');
  }

  return <ErrorPage error={error} reset={reset} currentLanguage={language} />;
}
