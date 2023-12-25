import AboutUsPage from '@/components/pages/AboutUsPage';

import { getConfig } from '@/config';

export const revalidate = getConfig().APP_REVALIDATE;

export default async function Page() {
  return <AboutUsPage />;
}
