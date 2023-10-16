import ContentList from '@/components/blocks/ContentList';

import { config } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { getTranslation } from '@/translation';

export const revalidate = config.APP_REVALIDATE;

interface PageProps {
  params: { locale: string };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslation();

  const data = await getContentsInfo(params.locale);

  return (
    <div className='p-4'>
      <div className='inline-flex rounded-md shadow-sm mx-3' role='group'>
        <a href='/he'>
          <button
            type='button'
            className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100
              hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
              ltr:rounded-l-lg rtl:rounded-r-lg'
          >
            עברית
          </button>
        </a>
        <a href='/en'>
          <button
            type='button'
            className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100
              hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
          >
            English
          </button>
        </a>
        <a href='/ar'>
          <button
            type='button'
            className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100
              hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
              ltr:rounded-r-lg rtl:rounded-l-md'
          >
            عربي
          </button>
        </a>
      </div>
      <h1 className='text-2xl font-bold text-center'>{t('site-title')}</h1>
      <p className='text-gray-600 text-center'>{t('site-subtitle')}</p>
      <ContentList data={data} />
    </div>
  );
}
