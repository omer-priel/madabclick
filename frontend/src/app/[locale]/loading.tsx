import LoadingPage from '@/components/pages/LoadingPage';

import { config } from '@/config';
import { getLocale } from '@/translation';

export const revalidate = config.APP_REVALIDATE;

export default async function Page() {
  return <LoadingPage locale={getLocale()} />;
}
