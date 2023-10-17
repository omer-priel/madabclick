'use client';

import { useState } from 'react';

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
      <div className='relative'>
        <div className="flex justify-center" onClick={() => setOpened((opened) => !opened)}>
          <img
            className="rtl:pl-[7px] ltr:pr-[7px] w-[25px] h-[25px]"
            alt={label}
            src={opened ? "/dashiconsarrowup.svg" : "/dashiconsarrowup1.svg"}
          />
          <span className='font-bold'>{label}</span>
        </div>
        <div className={"absolute top-[40px] right-[0px] z-10 rounded-[5px] bg-white shadow-[0px_1px_1px_rgba(0,_0,_0,_0.25)]" + (opened ? "" : " hidden")}>
          <div className="px-[7px] py-[10px] font-light rounded-[5px]">
          {options.map((option) => (
            <div
            key={option}
            className='flex justify-left w-[194px] px-[3px] py-[10px] rounded-[5px] hover:bg-gainsboro'
            onClick={() => {
              if (value.includes(option)) {
                onChange(value.filter(el => el != option));
              } else {
                onChange([...value, option]);
              }
            }}>
              <img
                className="p-[3px] w-[18px] h-[18px]"
                alt={option}
                src={value.includes(option) ? "/star-selected.svg" : "/star-not-selected.svg"}
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
