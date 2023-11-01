'use client';

import { useEffect } from 'react';

import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
  locale: string;
}

export default function ErrorPage({ error, reset, locale }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins'>
      <Header locale={locale} />
      <Section1 />
      <div className='w-full'>
        <div className='w-fit h-fit mx-auto mt-[0.5vw] text-black text-[40px]/[60px] text-left font-black' style={{ direction: 'ltr' }}>
          Something went wrong!
          <div className='w-[3.125vw] h-[0.416vw] bg-[#81B826]' />
        </div>
        <div className='w-fit h-fit mx-auto text-black text-[20px]/[30px] text-left font-normal' style={{ direction: 'ltr' }}>
          Message: {error.message}
        </div>
        <div className='w-fit h-fit mx-auto text-black text-[20px]/[30px] text-left font-black' style={{ direction: 'ltr' }}>
          <button className='w-fit h-[3.125vw] mt-[0.52vw] px-[1.041vw] mx-auto bg-[#81B826] rounded-[2.604vw]' onClick={reset}>
            Try again
          </button>
        </div>
      </div>
      <div className='w-full h-[5.208vw]' />
    </div>
  );
}
