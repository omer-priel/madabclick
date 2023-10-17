import HomePage from '@/components/pages/HomePage';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { getTranslation } from '@/translation';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslation();

  const data = await getContentsInfo(params.locale);

  return <HomePage data={data} />;
}
