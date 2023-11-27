'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Section1() {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[50vw] min-w-[900px] min-h-[730px]'>
      <Image className='absolute z-0 w-auto h-auto left-0 top-0 object-cover' alt='' src='/section-1-background.png' fill />
      <div
        className='absolute z-1 w-full h-full left-0 top-0'
        style={{ background: 'linear-gradient(284deg, rgba(0, 0, 0, 0.50) 28%, rgba(0, 0, 0, 0) 97%)' }}
      />
      <div
        className='absolute z-2 w-[520px] pb-[80px] rtl:right-[5.677vw] ltr:left-[5.677vw] top-[7.604vw]
      bg-black opacity-80 rounded-[20px] border border-[#FFCC4D] border-solid'
      >
        <div className='w-[423px] rtl:mr-[66px] ltr:ml-[66px] mt-[62px] text-[20px]/[30px] font-black text-[#FFB636]'>
          {t('section-1-title-part-1')}
        </div>
        <div className='w-[423px] rtl:mr-[63px] ltr:ml-[63px] text-[55px]/[78px] font-black text-[#FFB636]'>
          {t('section-1-title-part-2')}
        </div>
        <div
          className='w-[423px] rtl:mr-[66px] ltr:ml-[66px]
                  text-[20px]/[28px] font-normal text-white break-words'
        >
          {t('section-1-body')}
        </div>
      </div>
    </div>
  );
}
