'use client';

import ErrorPage from '@/components/pages/ErrorPage';

import { config } from '@/config';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  error: Error & { digest?: string };
  reset: () => void;
  params?: { locale?: string };
}

export default function Page({ error, reset, params }: PageProps) {
  const locale = params?.locale ? params.locale : 'he';
  return <ErrorPage error={error} reset={reset} locale={locale} />;
}
