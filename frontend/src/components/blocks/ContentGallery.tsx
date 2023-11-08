'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import ContentCard from '@/components/blocks/ContentCard';

import { Content } from '@/lib/api/schemas';
import contentsSidebarLeftArrowIcon from '@/public/contents-sidebar-left-arrow.svg';

const CONTENT_BLOCK_WIDTH = 395 + 31.81;
const SCROLL_SPEED = 9;

interface Props {
  contents: Content[];
  domain: string;
  showContentCard: (content: Content) => boolean;
}

export default function ContentGallery({ contents, domain, showContentCard }: Props) {
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [leftArrowVisible, setLeftArrowVisible] = useState<boolean>(true);
  const [rightArrowVisible, setRightArrowVisible] = useState<boolean>(true);

  const refGallery = useRef<HTMLDivElement>(null);

  const scrollTo = (target: number) => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }

    const handler = setInterval(() => {
      if (!refGallery.current) {
        return;
      }

      if (Math.abs(refGallery.current.scrollLeft - target) <= SCROLL_SPEED) {
        refGallery.current.scrollLeft = target;

        clearInterval(handler);
        setScrollInterval(null);

        if (target === 0) {
          setRightArrowVisible(false);
        } else if (target == refGallery.current.clientWidth - refGallery.current.scrollWidth) {
          setLeftArrowVisible(false);
        }

        return;
      }

      if (!rightArrowVisible) {
        setRightArrowVisible(true);
      }

      if (!leftArrowVisible) {
        setLeftArrowVisible(true);
      }

      if (refGallery.current.scrollLeft > target) {
        refGallery.current.scrollLeft -= SCROLL_SPEED;
      } else {
        refGallery.current.scrollLeft += SCROLL_SPEED;
      }
    }, 1);

    setScrollInterval(handler);
  };

  const scrollLeft = () => {
    if (scrollInterval) {
      return;
    }

    if (!refGallery.current) {
      return;
    }

    const end = refGallery.current.clientWidth - refGallery.current.scrollWidth;

    if (refGallery.current.scrollLeft == end) {
      return;
    }

    const blocksInWindow = Math.floor(refGallery.current.clientWidth / CONTENT_BLOCK_WIDTH);
    const target = refGallery.current.scrollLeft - blocksInWindow * CONTENT_BLOCK_WIDTH;

    if (target > end) {
      scrollTo(target);
    } else {
      scrollTo(end);
    }
  };

  const scrollRight = () => {
    if (scrollInterval) {
      return;
    }

    if (!refGallery.current) {
      return;
    }

    if (refGallery.current.scrollLeft == 0) {
      return;
    }

    const blocksInWindow = Math.floor(refGallery.current.clientWidth / CONTENT_BLOCK_WIDTH);
    const target = refGallery.current.scrollLeft + blocksInWindow * CONTENT_BLOCK_WIDTH;

    if (target < 0) {
      scrollTo(target);
    } else {
      scrollTo(0);
    }
  };

  useEffect(() => {
    if (!refGallery.current) {
      return;
    }

    if (refGallery.current.scrollLeft === 0) {
      setRightArrowVisible(false);
    } else if (refGallery.current.scrollLeft == refGallery.current.clientWidth - refGallery.current.scrollWidth) {
      setLeftArrowVisible(false);
    }
  }, [refGallery, setLeftArrowVisible, setRightArrowVisible]);

  return (
    <>
      <div className='flex flex-nowrap mt-[44px]'>
        <div ref={refGallery} className='flex ltr:flex-row-reverse h-fit mx-auto overflow-x-hidden pl-[31.81px]'>
          {contents
            .filter((content) => content.domain == domain)
            .map((content) => (
              <div key={content.index} className={'w-[395px] mr-[31.81px]' + (showContentCard(content) ? '' : ' hidden')}>
                <ContentCard content={content} />
              </div>
            ))}
        </div>
      </div>
      <Image
        className={'absolute w-[100px] h-[100px] left-0 top-[140px]' + (leftArrowVisible ? '' : ' hidden')}
        alt=''
        src={contentsSidebarLeftArrowIcon}
        width='100'
        height='100'
        onClick={() => scrollLeft()}
      />
      <Image
        className={'absolute w-[100px] h-[100px] right-0 top-[140px] rotate-180' + (rightArrowVisible ? '' : ' hidden')}
        alt=''
        src={contentsSidebarLeftArrowIcon}
        width='100'
        height='100'
        onClick={() => scrollRight()}
      />
    </>
  );
}
