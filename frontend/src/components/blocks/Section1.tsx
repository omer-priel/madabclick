'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section1() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[50vw]'>
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
      <div className='absolute z-2 right-[11.97vw] top-[10.468vw] text-[2vw]/[3.125vw] font-black text-white text-right'>
        {t('section-1-line-1')}
      </div>
      <div
        className='absolute z-2 w-[25.625vw] h-[6.5625vw] right-[10.625vw] top-[15.625vw]
                  text-[1vw]/[1.66vw] font-black text-white text-right'
      >
        {t('section-1-line-2')}
      </div>
    </div>
  );
}
