'use client';

import Image from 'next/image';

import fullLogoIcon from '@/public/full-logo.svg';
import MobileChangeLang from '@/components/atoms/MobileChangeLang';
import MobileSearchButton from '@/components/atoms/MobileSearchButton';
import { Content } from '@/lib/db/schemas';

interface Props {
  contents: Content[]
}

export default function MobileHeader({ contents } : Props ) {
  return (
    <div className='relative w-full h-[96px] bg-[#00b2ca]'>
      <div className='absolute w-fit h-fit right-[24.3px] top-[48px]'>
        <MobileChangeLang />
      </div>
      <div className='absolute w-[100px] h-[35px] right-[calc(50%_-_50px)] top-[48px]'>
        <Image alt='' src={fullLogoIcon} width='100' height='35' />
      </div>
      <div className='absolute w-fit h-fit left-[28px] top-[48px]'>
        <MobileSearchButton contents={contents} />
      </div>
    </div>
  );
}
