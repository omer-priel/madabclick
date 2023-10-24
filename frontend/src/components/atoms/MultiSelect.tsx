'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useOnLeaveElement } from '@/hooks';

interface Props {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultiSelect({ label, options, value, onChange }: Props) {
  const [opened, setOpened] = useState(false);
  const [labelWidth, setLabelWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useOnLeaveElement(containerRef, () => {
    setOpened(false);
  });

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.clientWidth);
    }
  }, [labelRef, setLabelWidth]);

  return (
    <>
      <div ref={containerRef} className='relative'>
        <div ref={labelRef} className='flex justify-center' onClick={() => setOpened((prevOpend) => !prevOpend)}>
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
        <div className='flex flex-wrap min-h-[41px]' style={labelWidth ? { width: `${labelWidth}px` } : {}}>
          {value.map((el) => (
            <div
              key={el}
              className='flex w-fit h-[33px] mx-[8px] mt-[8px] px-[8px] bg-white
                        rounded-[50px] box-border border-[1px] border-solid border-gray-300 text-right'
            >
              <p className='w-fit h-fit mx-auto my-auto'>{el}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
