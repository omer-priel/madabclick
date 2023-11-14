'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import cCircleIcon from '@/public/c-circle.svg';

export default function Footer() {
  const t = useTranslations();

  return (
    <div className='w-full h-[8.125vw] bg-[#FFD469] py-[30px]'>
      <div className='w-[309px] h-[50px] mx-auto mb-[20px]'>
        <a
          className='flex w-[309px] h-[50px] justify-center items-center no-underline text-white bg-[#00B2CA] rounded-[200px]'
          href={t('footer-beta-share-herf')}
          target='_black'
        >
          {t('footer-beta-share-label')}
        </a>
      </div>
      <div
        className='flex justify-center items-center mx-auto my-auto
      text-black text-right text-[20px]/[30px] font-normal align-middle'
      >
        {t('footer-copyright')}
        <Image className='w-[25px] h-[25px] mx-[10px] mt-[4px]' alt='©' src={cCircleIcon} width='25' height='25' />
      </div>
    </div>
  );
}
