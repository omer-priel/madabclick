'use client';

import Image from 'next/image';

import Slider from 'react-slick';

import ContentCardMobile from '@/components/blocks/ContentCardMobile';

import { Content } from '@/lib/api/schemas';
import { useStore } from '@/store';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import contentsSidebarLeftArrowIcon from '@/public/contents-sidebar-left-arrow.svg';
import { cn } from '@/lib/styling';
import { CSSProperties, MouseEventHandler } from 'react';

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
};

function PrevArrow({ className, style, onClick}: ArrowProps) {
  return (
    <Image
          className={cn('w-[30px] h-[30px]', className)}
          style={{ ...style, width: '30px', height: '30px', translate: '0 -100%', rotate: '180deg'}}
          alt=''
          src={contentsSidebarLeftArrowIcon}
          width='30'
          height='30'
          onClick={onClick}
        />
  );
}

function NextArrow({ className, style, onClick}: ArrowProps) {
  return (
    <Image
          className={cn('w-[30px] h-[30px]', className)}
          style={{ ...style, width: '30px', height: '30px'}}
          alt=''
          src={contentsSidebarLeftArrowIcon}
          width='30'
          height='50'
          onClick={onClick}
        />
  );
}

interface Props {
  contents: Content[];
}

export default function ContentGalleryMobile({ contents }: Props) {
  const deactivatePlayer = useStore((state) => state.deactivatePlayer);
  const dir = useStore((state) => state.language.dir);

  return (
    <div className='px-[30px]'>
      <Slider
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        centerPadding='20px'
        centerMode
        variableWidth
        arrows={true}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        rtl
        afterChange={() => {
          deactivatePlayer();
        }}
      >
        {contents.map((content) => (
          <div key={content.index} className='w-[67.632vw] pr-[10px] pl-[10px]'>
            <div className='w-[67.632vw]' id={`content-${content.index}`}>
              <ContentCardMobile content={content} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
