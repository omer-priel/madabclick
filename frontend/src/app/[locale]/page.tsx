import MainPage from '@/components/pages/MainPage';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/db/requests';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const data = await getContentsInfo();

  return (
    <div className='App'>
      <MainPage data={data} locale={params.locale} />
    </div>
  );
}
