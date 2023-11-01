'use client';

import Image from 'next/image';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ placeholder, value, onChange }: Props) {
  return (
    <div
      className='flex justify-left h-[2.864vw] px-[0.625vw] bg-white
                rounded-[2.604vw] box-border border-[1px] border-solid border-gray-300 text-right'
    >
      <Image className='w-[2.864vw] h-[2.864vw] mx-[0.625vw]' alt='' src='/search-icon.svg' width='55' height='55' />
      <input
        type='text'
        className='w-full h-[1.302vw] mx-[0.625vw] my-[0.781vw] text-[20px]/[26px] font-light placeholder:text-[#00000080]'
        style={{ outline: 'none' }}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
