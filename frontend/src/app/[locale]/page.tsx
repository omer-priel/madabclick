import MainPage from '@/components/pages/MainPage';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const data = await getContentsInfo(params.locale);

  return (
    <div className='App'>
      <MainPage data={data} />
    </div>
  );
}
