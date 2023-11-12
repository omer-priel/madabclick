import LoadingPage from '@/components/pages/LoadingPage';

import { getConfig } from '@/config';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  return <LoadingPage />;
}
