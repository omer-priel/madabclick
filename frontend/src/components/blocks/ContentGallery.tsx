'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import ContentCard from '@/components/blocks/ContentCard';

import { Content } from '@/lib/api/schemas';

interface Props {
  contents: Content[];
  domain: string;
  showContentCard: (content: Content) => boolean;
}

export default function ContentGallery({ contents, domain, showContentCard }: Props) {
  const [intervalHandler, setIntervalHandler] = useState<NodeJS.Timeout | null>(null);

  const refGallery = useRef<HTMLDivElement>(null);

  const stopScroll = () => {
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }

    setIntervalHandler(null);
  };

  const scrollLeft = () => {
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }

    const handler = setInterval(() => {
      if (!refGallery.current) {
        return;
      }

      refGallery.current.scrollLeft -= 3;
    }, 1);

    setIntervalHandler(handler);
  };

  const scrollRight = () => {
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }

    const handler = setInterval(() => {
      if (!refGallery.current) {
        return;
      }

      refGallery.current.scrollLeft += 3;
    }, 1);

    setIntervalHandler(handler);
  };

  return (
    <>
      <div className='flex flex-nowrap mt-[44px]'>
        <div ref={refGallery} className='flex h-fit mx-auto overflow-x-hidden'>
          {contents
            .filter((content) => content.domain == domain)
            .map((content) => (
              <div key={content.index} className={'ml-[31.81px] ' + (showContentCard(content) ? '' : ' hidden')}>
                <ContentCard content={content} />
              </div>
            ))}
        </div>
      </div>
      <Image
        className='absolute w-[100px] h-[100px] left-0 top-[140px]'
        alt=''
        src={'/contents-sidebar-right-arrow.svg'}
        width='100'
        height='100'
        onMouseOver={() => scrollLeft()}
        onMouseOut={() => stopScroll()}
      />
      <Image
        className='absolute w-[100px] h-[100px] right-0 top-[140px] rotate-180'
        alt=''
        src={'/contents-sidebar-right-arrow.svg'}
        width='100'
        height='100'
        onMouseOver={() => scrollRight()}
        onMouseOut={() => stopScroll()}
      />
    </>
  );
}
