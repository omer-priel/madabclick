'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Props {
  locale: string;
}

export default function Header({ locale }: Props) {
  const t = useTranslations();

  return (
    <>
      <div className='relative w-full h-[158px]'>
        <div className='absolute w-[250px] h-[35px] top-[38px] right-[52px]'>
          <div className='flex ltr:flex-row-reverse'>
            <Image className='ml-[36px]' alt={t('choose-language')} src={'/choose-language.svg'} width='35' height='35' />
            <div className='h-[24px] ml-[36px] my-auto'>
              <a href='/he' className={'text-right hover:text-yellowgreen-200' + (locale == 'he' ? ' text-yellowgreen-200' : '')}>
                עברית
              </a>
            </div>
            <div className='h-[24px] ml-[36px] my-auto'>
              <a href='/en' className={'text-right hover:text-yellowgreen-200' + (locale == 'en' ? ' text-yellowgreen-200' : '')}>
                English
              </a>
            </div>
            <div className='h-[24px] my-auto'>
              <a href='/ar' className={'text-right hover:text-yellowgreen-200' + (locale == 'ar' ? ' text-yellowgreen-200' : '')}>
                عربي
              </a>
            </div>
          </div>
        </div>
        <Image
          className='absolute top-[30px] left-[calc(50%_-_140px)] w-[280px] h-[97px]'
          alt=''
          src='/full-logo.svg'
          width='280'
          height='97'
        />
      </div>
      <div className='relative w-full h-[960px]'>
        <Image className='absolute w-full h-full left-0 top-0 object-cover' alt='' src='/header-image.png' width='1920' height='960' />
        <div
          className='absolute w-full h-full left-0 top-0
                    [back first-letter:ground:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)]'
        />
        <div className='absolute h-[60px] right-[201px] top-[230px] text-[40px]/[60px] font-black text-white text-right'>
          {t('header-line-1')}
        </div>
        <div className='absolute w-[492px] h-[126px] right-[204px] top-[300px] text-[20px]/[32px] font-black text-white text-right'>
          {t('header-line-2')}
        </div>
      </div>
    </>
  );
}
