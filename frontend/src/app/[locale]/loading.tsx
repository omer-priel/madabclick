import LoadingPage from '@/components/pages/LoadingPage';

import { getConfig } from '@/config';

export const revalidate = getConfig().APP_REVALIDATE;

interface PageProps {
  params?: { locale?: string };
}

export default async function Page({ params }: PageProps) {
  const locale = params?.locale ? params.locale : 'he';
  return <LoadingPage locale={locale} />;
}
