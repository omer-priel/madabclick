'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { cn } from '@/lib/styling';
import cCircleIcon from '@/public/c-circle.svg';

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  const t = useTranslations();

  return (
    <div className={cn('w-full bg-[#FFD469] pt-[94px] pb-[70px]', className)}>
      <div
        className='flex justify-center items-center mx-auto text-black
        text-right text-[20px]/[30px] font-normal align-middle'
      >
        {t('footer-copyright')}
        <Image className='w-[25px] h-[25px] mx-[10px] mt-[4px]' alt='©' src={cCircleIcon} width='25' height='25' />
      </div>
    </div>
  );
}
