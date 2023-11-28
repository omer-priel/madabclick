'use client';

import Slider from 'react-slick';

import ContentCardMobile from '@/components/blocks/ContentCardMobile';

import { Content } from '@/lib/api/schemas';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Props {
  contents: Content[];
}

export default function ContentGalleryMobile({ contents }: Props) {
  return (
    <Slider infinite speed={500} slidesToShow={1} slidesToScroll={1} arrows={false}>
      {contents.map((content) => (
        <div key={content.index} className='w-full'>
          <div className='mx-auto w-fit' id={`content-${content.index}`}>
            <ContentCardMobile content={content} />
          </div>
        </div>
      ))}
    </Slider>
  );
}
