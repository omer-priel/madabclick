'use client';

import { useState } from 'react';

import Image from 'next/image';

interface Props {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultiSelect({ label, options, value, onChange }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className='relative' onBlur={() => setOpened(false)}>
        <div className='flex justify-center' onClick={() => setOpened((prevOpend) => !prevOpend)}>
          <Image
            className={'rtl:pl-[7px] ltr:pr-[7px]' + (!opened ? '' : ' hidden')}
            alt={label}
            src={'/select-down.svg'}
            width='25'
            height='25'
          />
          <Image
            className={'rtl:pl-[7px] ltr:pr-[7px]' + (opened ? '' : ' hidden')}
            alt={label}
            src={'/select-up.svg'}
            width='25'
            height='25'
          />
          <span className='font-bold'>{label}</span>
        </div>
        <div
          className={
            'absolute top-[40px] rtl:right-0 ltr:left-0 z-10 rounded-[5px] bg-white shadow-[0px_1px_1px_rgba(0,_0,_0,_0.25)]' +
            (opened ? '' : ' hidden')
          }
        >
          <div className='px-[7px] py-[10px] font-light rounded-[5px]'>
            {options.map((option) => (
              <div
                key={option}
                className='flex justify-left w-[194px] px-[3px] py-[10px] rounded-[5px] hover:bg-gainsboro'
                onClick={() => {
                  if (value.includes(option)) {
                    onChange(value.filter((el) => el != option));
                  } else {
                    onChange([...value, option]);
                  }
                }}
              >
                <Image
                  className='p-[3px]'
                  alt={option}
                  src={value.includes(option) ? '/select-selected.svg' : '/select-not-selected.svg'}
                  width='18'
                  height='18'
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
