import HomePage from '@/components/pages/HomePage';

import { getConfig } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';

export const revalidate = getConfig().APP_REVALIDATE;

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const data = await getContentsInfo(params.locale);

  return <HomePage data={data} locale={params.locale} />;
}
