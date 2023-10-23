'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section2() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[514px]'>
      <div className='absolute w-[200px] h-[100px] right-[452px] top-[112px] text-black text-[40px]/[60px] text-right font-black'>
        {t('section-2-title')}
        <div className='w-[60px] h-[8px] bg-[#81B826]' />
      </div>
      <div className='absolute w-[632px] h-[180px] right-[444px] top-[225px] text-black text-[20px]/[30px] text-right font-normal'>
        {t('section-2-body')}
      </div>
      <Image
        className='absolute w-[384px] h-[355px] right-[1116px] top-[74px] object-cover'
        alt=''
        src='/logo.svg'
        width='384'
        height='355'
      />
    </div>
  );
}
