'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section1() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[50vw] min-w-[850px] min-h-[730px]'>
      <Image
        className='absolute z-0 w-full h-full left-0 top-0 object-cover'
        alt=''
        src='/section-1-background.png'
        width='1920'
        height='960'
      />
      <div
        className='absolute z-1 w-full h-full left-0 top-0'
        style={{ background: 'linear-gradient(284deg, rgba(0, 0, 0, 0.50) 28%, rgba(0, 0, 0, 0) 97%)' }}
      />
      <div className='absolute z-2 right-[11.97vw] top-[10.468vw]'>
        <div className='w-[450px] text-[54px]/[80px] font-black text-white text-right'>{t('section-1-title')}</div>
        <div
          className='w-[450px] h-[168px]
                  text-[20px]/[28px] font-normal text-white text-right break-words'
        >
          {t('section-1-body')}
        </div>
      </div>
    </div>
  );
}
