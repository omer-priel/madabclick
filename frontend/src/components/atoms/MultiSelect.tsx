'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useOnLeaveElement, useOnPageResized } from '@/hooks';

interface Props {
  label: string;
  options: string[];
  values: string[];
  onChange: (value: string[]) => void;
}

export default function MultiSelect({ label, options, values, onChange }: Props) {
  const t = useTranslations();

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
          <div ref={labelRef} className='flex justify-center'>
            <Image
              className={'w-[25px] h-[25px]' + (!opened ? '' : ' rotate-180')}
              alt={label}
              src={'/select-down.svg'}
              width='25'
              height='25'
            />
            <div className='text-white font-bold text-[16px]/[24px]'>{label}</div>
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
                  if (values.includes(option)) {
                    onChange(values.filter((el) => el != option));
                  } else {
                    onChange([...values, option]);
                  }
                }}
              >
                <Image
                  className='w-[0.937vw] h-[0.937vw] p-[0.526vw]'
                  alt={option}
                  src={values.includes(option) ? '/select-selected.svg' : '/select-not-selected.svg'}
                  width='18'
                  height='18'
                />
                <span className='my-auto text-[16px]/[24px] font-normal'>{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-wrap min-h-[2.135vw] mx-auto' style={labelWidth ? { width: `${labelWidth}px` } : {}}>
          {values.map((value) => (
            <div
              key={value}
              className='flex justify-left w-fit h-[24px] mx-[8px] mt-[4px] px-[4px]
                        rounded-[5px] box-border border-[1px] border-white border-solid'
            >
              <Image
                className='w-[10px] h-[9px] mx-[4px] my-auto'
                alt={t('remove')}
                src={'/close.svg'}
                width='10'
                height='9'
                onClick={() => {
                  onChange(values.filter((el) => el != value));
                }}
              />
              <div className='w-fit h-fit mx-[4px] my-auto text-white text-right text-[16px]/[24px] font-light'>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
