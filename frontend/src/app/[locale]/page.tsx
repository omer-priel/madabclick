import HomePage from '@/components/pages/HomePage';

import { getConfig } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { getLocale } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  const data = await getContentsInfo(getLocale());
  return <HomePage data={data} locale={getLocale()} />;
}
