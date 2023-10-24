import LoadingPage from '@/components/pages/LoadingPage';

import { config } from '@/config';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  params?: { locale?: string };
}

export default async function Page({ params }: PageProps) {
  const locale = params?.locale ? params.locale : 'he';
  return <LoadingPage locale={locale} />;
}
