'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { useOnLeaveElement } from '@/hooks';
import selectDownMobileIcon from '@/public/select-down-mobile.svg';
import { useStore } from '@/store';

export default function MobileChangeLang() {
  const [opened, setOpened] = useState(false);

  const languageLabel = useStore((state) => {
    switch (state.language.locale) {
      case 'he':
        return 'עב';
      case 'en':
        return 'en';
      case 'ar':
        return 'ar';
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useOnLeaveElement(containerRef, () => {
    setOpened(false);
  });

  return (
    <>
      <div ref={containerRef} className='relative'>
        <div className='flex justify-center' onClick={() => setOpened((prevOpend) => !prevOpend)}>
          <div className='flex justify-center ltr:flex-row-reverse'>
            <Image
              className={'w-[10px] h-[10px]' + (!opened ? '' : ' rotate-180')}
              alt=''
              src={selectDownMobileIcon}
              width='10'
              height='10'
            />
            <div className='text-black font-bold text-[12px]/[18px]'>{languageLabel}</div>
          </div>
        </div>
        <div
          className={'absolute top-[20px] right-[20px] z-10 rounded-[8px] text-white bg-black/50' + (opened ? '' : ' hidden')}
          style={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)' }}
        >
          <div className='px-[15px] py-[10px] font-light rounded-[8px]'>
            <div
              className='flex justify-left w-[50px] px-[4px] py-[4px] rounded-[8px]'
              onClick={() => {
                window.location.pathname = '/he/';
              }}
            >
              <span className='my-auto text-[12px]/[18px] font-normal'>עברית</span>
            </div>
            <div
              className='flex justify-left text-[12px]/[18px] py-[4px] rounded-[8px]'
              onClick={() => {
                window.location.pathname = '/en/';
              }}
            >
              <span className='my-auto text-[12px]/[18px] font-normal'>English</span>
            </div>
            <div
              className='flex justify-left w-[50px] px-[4px] py-[4px] rounded-[8px]'
              onClick={() => {
                window.location.pathname = '/ar/';
              }}
            >
              <span className='my-auto text-[12px]/[18px] font-normal'>عربي</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
