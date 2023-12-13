'use client';

import Slider from 'react-slick';

import ContentCardMobile from '@/components/blocks/ContentCardMobile';

import { Content } from '@/lib/api/schemas';
import { useStore } from '@/store';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Props {
  contents: Content[];
}

export default function ContentGalleryMobile({ contents }: Props) {
  const deactivatePlayer = useStore((state) => state.deactivatePlayer);

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
        arrows
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
