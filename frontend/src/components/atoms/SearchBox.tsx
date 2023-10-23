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
      className='flex justify-left h-[55px] px-[12px] bg-white
                rounded-[50px] box-border border-[1px] border-solid border-gray-300 text-right'
    >
      <Image className='mx-[12px] overflow-hidden' alt='' src='/search-icon.svg' width='55' height='55' />
      <input
        type='text'
        className='w-full h-[25px] mx-[12px] my-[15px] font-light'
        style={{ outline: 'none' }}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
