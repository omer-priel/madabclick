'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useOnLeaveElement, useOnPageResized } from '@/hooks';

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
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, [labelRef, setLabelWidth]);

  useOnPageResized(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  });

  return (
    <>
      <div ref={containerRef} className='relative'>
        <div className='flex justify-center' onClick={() => setOpened((prevOpend) => !prevOpend)}>
          <div ref={labelRef}>
            <Image
              className={'w-[1.302vw] h-[1.302vw] rtl:pl-[0.364vw] ltr:pr-[0.364vw]' + (!opened ? '' : ' hidden')}
              alt={label}
              src={'/select-down.svg'}
              width='25'
              height='25'
            />
            <Image
              className={'w-[1.302vw] h-[1.302vw] rtl:pl-[0.364vw] ltr:pr-[0.364vw]' + (opened ? '' : ' hidden')}
              alt={label}
              src={'/select-up.svg'}
              width='25'
              height='25'
            />
            <span className='font-bold text-[0.833vw]/[1.25vw]'>{label}</span>
          </div>
        </div>
        <div
          className={'absolute top-[2.083vw] rtl:right-0 ltr:left-0 z-10 rounded-[0.26vw] bg-white' + (opened ? '' : ' hidden')}
          style={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)' }}
        >
          <div className='px-[0.364vw] py-[0.52vw] font-light rounded-[0.26vw]'>
            {options.map((option) => (
              <div
                key={option}
                className='flex justify-left w-[10.104vw] px-[0.526vw] py-[0.52vw] rounded-[0.26vw] hover:bg-gainsboro'
                onClick={() => {
                  if (value.includes(option)) {
                    onChange(value.filter((el) => el != option));
                  } else {
                    onChange([...value, option]);
                  }
                }}
              >
                <Image
                  className='w-[0.937vw] h-[0.937vw] p-[0.526vw]'
                  alt={option}
                  src={value.includes(option) ? '/select-selected.svg' : '/select-not-selected.svg'}
                  width='18'
                  height='18'
                />
                <span className='my-auto text-[0.8333vw]/[1.25vw] font-normal'>{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-wrap min-h-[2.135vw] mx-auto' style={labelWidth ? { width: `${labelWidth}px` } : {}}>
          {value.map((el) => (
            <div
              key={el}
              className='flex w-fit h-[1.718vw] mx-[0.416vw] mt-[0.416vw] px-[0.416vw] bg-white
                        rounded-[2.604vw] box-border border-[1px] border-solid border-gray-300'
            >
              <p className='w-fit h-fit mx-auto my-auto text-right text-[0.8333vw]/[1.25vw] font-normal'>{el}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
