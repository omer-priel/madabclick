'use client';

import Image from 'next/image';

import MobileChangeLang from '@/components/atoms/MobileChangeLang';
import MobileSearchButton from '@/components/blocks/MobileSearchButton';
import MobileSettings, { MobileSettingsValue } from '@/components/blocks/MobileSettings';

import { ContentsSchema } from '@/lib/api/schemas';
import fullLogoIcon from '@/public/full-logo.svg';

interface Props {
  data: ContentsSchema;
  onSettingsSaved: (settings: MobileSettingsValue) => void;
}

export default function MobileHeader({ data, onSettingsSaved }: Props) {
  return (
    <div className='relative w-full h-[73px] bg-[#00b2ca]'>
      <div className='absolute w-fit h-fit right-[24.3px] top-[55px]'>
        <MobileChangeLang />
      </div>
      <div className='absolute w-[100px] h-[35px] right-[calc(50%_-_50px)] top-[25px]'>
        <Image alt='' src={fullLogoIcon} width='100' height='35' />
      </div>
      <div className='absolute w-fit h-fit left-[28px] top-[30px]'>
        <MobileSearchButton data={data} />
      </div>
      <div className='absolute w-fit h-fit left-[66px] top-[30px]'>
        <MobileSettings data={data} onSettingsSaved={onSettingsSaved} />
      </div>
    </div>
  );
}
