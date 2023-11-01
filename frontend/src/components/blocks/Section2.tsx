'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section2() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[27.76vw]'>
      <div
        className='absolute w-[9.322vw] h-[3.125vw] right-[23.541vw] top-[5.833vw]
                text-black text-[40px]/[60px] text-right font-black'
      >
        {t('section-2-title')}
        <div className='w-[3.125vw] h-[0.416vw] bg-[#81B826]' />
      </div>
      <div
        className='absolute w-[32.916vw] h-[9.375vw] right-[23.125vw] top-[11.718vw]
                text-black text-[20px]/[30px] text-right font-normal'
      >
        {t('section-2-body')}
      </div>
      <Image
        className='absolute w-[20vw] h-[18.515vw] right-[58.125vw] top-[5.208vw] object-cover'
        alt=''
        src='/logo.svg'
        width='384'
        height='355'
      />
    </div>
  );
}
