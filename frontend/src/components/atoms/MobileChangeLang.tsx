'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { useOnLeaveElement } from '@/hooks';
import selectDownIcon from '@/public/select-down.svg';

export default function MobileChangeLang() {
  const [opened, setOpened] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useOnLeaveElement(containerRef, () => {
    setOpened(false);
  });

  return (
    <>
      <div ref={containerRef} className='relative'>
        <div className='flex justify-center' onClick={() => setOpened((prevOpend) => !prevOpend)}>
          <div className='flex justify-center'>
            <Image
              className={'w-[25px] h-[25px]' + (!opened ? '' : ' rotate-180')}
              alt="עב"
              src={selectDownIcon}
              width='25'
              height='25'
            />
            <div className='text-black font-bold text-[12px]/[18px]'>עב</div>
          </div>
        </div>
        <div
          className={'absolute top-[20px] rtl:right-[20px] ltr:left-[20px] z-10 rounded-[8px] text-white bg-black/50' + (opened ? '' : ' hidden')}
          style={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)' }}
        >
          <div className='px-[15px] py-[10px] font-light rounded-[8px]'>
              <div
                className='flex justify-left w-[50px] px-[4px] py-[4px] rounded-[8px]'
                onClick={() => { window.location.pathname = '/he/';  }}
              >
                <span className='my-auto text-[12px]/[18px] font-normal'>עברית</span>
              </div>
              <div
                className='flex justify-left text-[12px]/[18px] py-[4px] rounded-[8px]'
                onClick={() => { window.location.pathname = '/en/';  }}
              >
                <span className='my-auto text-[12px]/[18px] font-normal'>English</span>
              </div>
              <div
                className='flex justify-left w-[50px] px-[4px] py-[4px] rounded-[8px]'
                onClick={() => { window.location.pathname = '/ar/';  }}
              >
                <span className='my-auto text-[12px]/[18px] font-normal'>عربي</span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
