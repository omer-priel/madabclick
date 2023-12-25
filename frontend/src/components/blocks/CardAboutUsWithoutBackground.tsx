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
      <div className="flex flex-col items-stretch w-full max-md:w-[46%] ml-5 max-md:ml-0">
        <div className="flex flex-col mt-2 mb-4 items-end">
          <div className="text-black text-right text-base uppercase">{littleTitle}</div>
          <div className="text-black font-bold text-xl text-right uppercase mt-4">{title}</div>
          <div style={{ backgroundColor: 'black', height: '2px', width: '514px' }}></div>
          <Image
          loading="lazy"
          src={imageSrc}
          alt={title} // Provide a meaningful alt text
          className="aspect-[0.97] object-contain object-center w-[184px] overflow-hidden shrink-0 max-w-full mt-16 max-md:mt-10"
          width={184}
          height={190}
        />
          <div className="text-black text-right text-base uppercase mt-4">{description}</div>
        </div>
      </div>
    );
  };

  export default CardAboutUsWithoutBackground;