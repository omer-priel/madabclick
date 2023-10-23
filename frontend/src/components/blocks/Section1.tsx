'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section1() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[960px]'>
      <Image
        className='absolute w-full h-full left-0 top-0 object-cover'
        alt=''
        src='/section-1-background.png'
        width='1920'
        height='960'
      />
      <div
        className='absolute w-full h-full left-0 top-0
                    [back first-letter:ground:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)]'
      />
      <div className='absolute h-[60px] right-[201px] top-[230px] text-[40px]/[60px] font-black text-white text-right'>
        {t('section-1-line-1')}
      </div>
      <div className='absolute w-[492px] h-[126px] right-[204px] top-[300px] text-[20px]/[32px] font-black text-white text-right'>
        {t('section-1-line-2')}
      </div>
    </div>
  );
}
