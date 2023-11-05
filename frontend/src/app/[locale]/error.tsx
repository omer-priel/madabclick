'use client';

import ErrorPage from '@/components/pages/ErrorPage';

import { getConfig } from '@/config';

export const revalidate = getConfig().APP_REVALIDATE;

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Page({ error, reset }: Props) {
  return <ErrorPage error={error} reset={reset} locale={document.documentElement.lang} />;
}
