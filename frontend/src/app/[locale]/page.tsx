import HomePage from '@/components/pages/HomePage';

import { getConfig } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { getLanguage } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  const data = await getContentsInfo(getLanguage());
  return <HomePage data={data} currentLanguage={getLanguage()} />;
}
