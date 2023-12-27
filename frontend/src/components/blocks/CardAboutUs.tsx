import React from 'react';
import Image from 'next/image';

interface CardProps {
  littleTitle: string;
  title: string;
  description: string;
  imageSrc: string;
}

const CardAboutUs: React.FC<CardProps> = ({ littleTitle, title, description, imageSrc }) => {
  return (
    <div className='flex flex-col items-stretch w-[42%] max-md:w-full max-md:ml-0  mx-auto relative'>
      <div
        className='shadow-sm bg-cyan-500 bg-opacity-20 flex grow flex-col justify-center items-center w-full px-16 py-12 rounded-3xl border-2 border-solid border-teal-400 max-md:max-w-full max-md:px-5'
      >
        <div className='flex w-[400px] max-w-full flex-col mt-2 mb-4 items-end '>
          <div className='text-black text-right text-base uppercase w-full'>{littleTitle}</div>
          <div className='text-black font-bold text-xl text-right uppercase w-full'>{title}</div>
          <div className='text-black text-right text-base uppercase self-stretch mt-6'>{description}</div>
        </div>
        
          <Image
            loading='lazy'
            src={imageSrc}
            alt={title} // Provide a meaningful alt text
            className='aspect-[0.97] object-contain object-center w-[115px] h-[119px] overflow-hidden shrink-0 max-w-full justify-self: end'
            width={115}
            height={119}
          />
        
      </div>
    </div>
  );
};

export default CardAboutUs;
