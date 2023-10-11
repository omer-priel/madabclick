import MainPage from '@/components/pages/MainPage';

import { config } from '@/config';
import { getContents } from '@/lib/db/requests';

export const revalidate = config.APP_REVALIDATE;

export default async function Page() {
  const contents = await getContents();

  return (
    <div className='App'>
      <MainPage contents={contents} />
    </div>
  );
}
