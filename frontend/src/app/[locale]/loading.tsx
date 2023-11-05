import LoadingPage from '@/components/pages/LoadingPage';

import { getConfig } from '@/config';
import { getLanguage } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  return <LoadingPage currentLanguage={getLanguage()} />;
}
