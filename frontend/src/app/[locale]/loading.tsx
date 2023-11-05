import LoadingPage from '@/components/pages/LoadingPage';

import { getConfig } from '@/config';
import { getLocale } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  return <LoadingPage locale={getLocale()} />;
}
