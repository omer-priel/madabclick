'use client';

import Image from 'next/image';

import { useStore } from '@/store';

import fullLogoIcon from '@/public/full-logo.svg';
import MobileChangeLang from '@/components/atoms/MobileChangeLang';

export default function MobileHeader() {
  return (
    <div className='relative w-full h-[96px] bg-[#00b2ca]'>
      <div className='absolute w-fit h-fit top-[45px] right-[62px]'>
        <MobileChangeLang />
      </div>
      <div className='absolute w-[100px] h-[35px] right-[calc(50%_-_50px)] top-[48px]'>
        <Image alt='' src={fullLogoIcon} width='100' height='35' />
      </div>
    </div>
  );
}
