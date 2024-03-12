import React from 'react';

import Image from 'next/image';

interface CardProps {
  littleTitle: string;
  title: string;
  description: string;
  imageSrc: string;
}

const CardAboutUsWithoutBackground: React.FC<CardProps> = ({ littleTitle, title, description, imageSrc }) => {
  return (
    <div className='flex flex-col  items-center w-full max-md:w-[46%]'>
      <div style={{ position: 'relative', top: '115px' }}>
        <div className='text-black text-base uppercase text-right mt-40'>
          {' '}
          {/* Center the text */}
          {littleTitle}
        </div>
        <div className='text-black font-bold text-3xl uppercase text-right'>
          {' '}
          {/* Center the text */}
          {title}
        </div>
      </div>
      <div className='flex items-center justify-center -ml-40 '>
        {' '}
        {/* Center the image and line */}
        <div
          style={{ backgroundColor: 'black', height: '2px', width: '219px', position: 'relative', right: '50px', top: '1px' }}
          className='mt-14 '
        ></div>
        <Image
          loading='lazy'
          src={imageSrc}
          alt={title}
          className='aspect-[0.97] object-contain object-center w-[184px] h-[184px] ' // Adjust width and height if needed
        />
      </div>
      <div className='text-black text-base uppercase mt-4 text-center'>
        {' '}
        {/* Center the text */}
        {description}
      </div>
    </div>
  );
};

export default CardAboutUsWithoutBackground;
