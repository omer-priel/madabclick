import MainPage from '@/components/pages/MainPage';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/db/requests';

export const revalidate = config.APP_REVALIDATE;

export default async function Page() {
  const data = await getContentsInfo();

  return (
    <div className='App'>
      <MainPage data={data} />
    </div>
  );
}
