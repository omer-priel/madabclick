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
    <div className="flex flex-col items-stretch w-[77%] max-md:w-full max-md:ml-0 relative">
      <div className="shadow-sm bg-cyan-500 bg-opacity-20 flex grow flex-col justify-center items-center w-full px-16 py-12 rounded-3xl border-2 border-solid border-teal-400 max-md:max-w-full max-md:px-5">
        <div className="flex w-[400px] max-w-full flex-col mt-2 mb-4 items-end">
          <div className="text-black text-right text-base uppercase w-full">{littleTitle}</div>
          <div className="text-black font-bold text-xl text-right uppercase w-full">{title}</div>
          <div className="text-black text-right text-base uppercase self-stretch mt-6">{description}</div>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <Image
            loading="lazy"
            src={imageSrc}
            alt={title} // Provide a meaningful alt text
            className="aspect-[0.97] object-contain object-center w-[92px] overflow-hidden shrink-0 max-w-full"
            width={92}
            height={95}
          />
        </div>
      </div>
    </div>
  );
};

export default CardAboutUs;
