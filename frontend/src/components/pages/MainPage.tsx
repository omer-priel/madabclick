import ContentList from '@/components/blocks/ContentList';
import { ArabicIcon, EnglishIcon, HebrewIcon } from '@/components/icons';

import { ContentsSchema } from '@/lib/db/schemas';
import { getTranslation } from '@/translation';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default async function MainPage({ data, locale }: Props) {
  const t = await getTranslation();

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-center'>{t('site-title')}</h1>
      <p className='text-gray-600 text-center'>{t('site-subtitle')}</p>
      <div className='text-center'>
        {t('choose-language')}:
        <div className='inline-flex rounded-md shadow-sm mx-3' role='group'>
          <a href='/he'>
            <button
              type='button'
              className='px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2
              focus:ring-blue-700 ltr:rounded-l-lg rtl:rounded-r-lg'
            >
              <HebrewIcon />
            </button>
          </a>
          <a href='/en'>
            <button
              type='button'
              className='px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2
              focus:ring-blue-700'
            >
              <EnglishIcon />
            </button>
          </a>
          <a href='/ar'>
            <button
              type='button'
              className='px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2
              focus:ring-blue-700 ltr:rounded-r-lg rtl:rounded-l-md'
            >
              <ArabicIcon />
            </button>
          </a>
        </div>
      </div>
      <ContentList data={data} locale={locale} />
    </div>
  );
}
