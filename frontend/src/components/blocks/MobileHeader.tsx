'use client';

import Image from 'next/image';

import MobileChangeLang from '@/components/atoms/MobileChangeLang';
import MobileSearchButton from '@/components/blocks/MobileSearchButton';

import { ContentsSchema } from '@/lib/api/schemas';
import fullLogoIcon from '@/public/full-logo.svg';

interface Props {
  data: ContentsSchema;
}

export default function MobileHeader({ data }: Props) {
  return (
    <div className='relative w-full h-[96px] bg-[#00b2ca]'>
      <div className='absolute w-fit h-fit right-[24.3px] top-[48px]'>
        <MobileChangeLang />
      </div>
      <div className='absolute w-[100px] h-[35px] right-[calc(50%_-_50px)] top-[48px]'>
        <Image alt='' src={fullLogoIcon} width='100' height='35' />
      </div>
      <div className='absolute w-fit h-fit left-[28px] top-[48px]'>
        <MobileSearchButton data={data} />
      </div>
    </div>
  );
}
