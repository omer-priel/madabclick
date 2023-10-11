import ContentList from '@/components/blocks/ContentList';

import { ContentsSchema } from '@/lib/db/schemas';
import { getTranslation } from '@/translation';

interface Props {
  data: ContentsSchema;
}

export default async function MainPage({ data }: Props) {
  const t = await getTranslation();

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-center'>{t('site-title')}</h1>
      <p className='text-gray-600 text-center'>{t('site-subtitle')}</p>
      <ContentList data={data} />
    </div>
  );
}
