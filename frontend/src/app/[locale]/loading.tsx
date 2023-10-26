import LoadingPage from '@/components/pages/LoadingPage';

import { config } from '@/config';

export const revalidate = config.APP_REVALIDATE;

export default async function Page() {
  return <LoadingPage locale="he" />;
}
