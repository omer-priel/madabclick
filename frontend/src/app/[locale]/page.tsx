import HomePage from '@/components/pages/HomePage';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { getLocale } from '@/translation';

export const revalidate = config.APP_REVALIDATE;

export default async function Page() {
  const data = await getContentsInfo(getLocale());
  return <HomePage data={data} locale={getLocale()} />;
}
