'use client';

import { Fragment, TouchEvent, useEffect, useRef, useState } from 'react';

import ContentCardMobile from '@/components/blocks/ContentCardMobile';

import { Content } from '@/lib/api/schemas';
import { useStore } from '@/store';

const SCROLL_SPEED = 9;

interface Props {
  contents: Content[];
}

export default function ContentGalleryMobile({ contents }: Props) {
  const deactivatePlayer = useStore((state) => state.deactivatePlayer);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (slideIndex: number, usingInterval: boolean) => {
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }

    if (!sliderRef.current) {
      return;
    }

    const spaceEl = sliderRef.current.querySelector(':nth-child(1)');
    const spaceWidth = spaceEl ? spaceEl.clientWidth : 40;

    const slideEl = sliderRef.current.querySelector(':nth-child(2)');
    const slideWidth = slideEl ? slideEl.clientWidth : 40;

    let scrollLeft = -(slideIndex + 1) * (spaceWidth + slideWidth) - spaceWidth;
    scrollLeft += (document.body.clientWidth - slideWidth) / 2;

    currentTranslate.current = scrollLeft;

    if (!usingInterval) {
      sliderRef.current.scrollLeft = scrollLeft;
      return;
    }

    // scroll to currentTranslate by interval
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }

    scrollInterval.current = setInterval(() => {
      if (!sliderRef.current) {
        return;
      }

      if (Math.abs(sliderRef.current.scrollLeft - currentTranslate.current) <= SCROLL_SPEED) {
        sliderRef.current.scrollLeft = currentTranslate.current;

        if (scrollInterval.current) {
          clearInterval(scrollInterval.current);
          scrollInterval.current = null;
        }
        return;
      }

      if (sliderRef.current.scrollLeft > currentTranslate.current) {
        sliderRef.current.scrollLeft -= SCROLL_SPEED;
      } else {
        sliderRef.current.scrollLeft += SCROLL_SPEED;
      }
    }, 1);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (!sliderRef.current) {
      return;
    }

    if (isDragging.current) {
      return;
    }

    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }

    deactivatePlayer();

    isDragging.current = true;
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!sliderRef.current) {
      return;
    }

    if (!isDragging.current) {
      return;
    }

    const distance = event.touches[0].clientX - startX.current;
    sliderRef.current.scrollLeft = currentTranslate.current - distance;
  };

  const handleTouchEnd = () => {
    if (!sliderRef.current) {
      return;
    }

    if (!isDragging.current) {
      return;
    }

    deactivatePlayer();

    let toSlide = currentSlide;

    const slideEl = sliderRef.current.querySelector(':nth-child(2)');
    const slideWidth = slideEl ? slideEl.clientWidth : 40;

    if (currentTranslate.current - slideWidth / 2 > sliderRef.current.scrollLeft) {
      if (currentSlide < contents.length - 1) {
        toSlide += 1;
      }
    } else if (currentTranslate.current + slideWidth / 2 < sliderRef.current.scrollLeft) {
      if (currentSlide > 0) {
        toSlide -= 1;
      }
    }

    isDragging.current = false;

    goToSlide(toSlide, true);
  };

  useEffect(() => {
    goToSlide(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-nowrap'>
      <div ref={sliderRef} className='flex rtl h-fit mx-auto overflow-x-hidden' onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className='min-w-[40px]' onTouchStart={handleTouchStart} />
        <div className='min-w-[67.632vw]' onTouchStart={handleTouchStart} />
        {contents.map((content, index) => (
          <Fragment key={content.index}>
            <div className='min-w-[40px]' onTouchStart={handleTouchStart} />
            <div className='relative w-[67.632vw] h-fit'>
              <div className='w-[67.632vw] h-fit z-1'>
                <ContentCardMobile content={content} />
              </div>
              <div
                className='absolute w-[67.632vw] h-full top-0 right-0 z-2'
                style={{ visibility: currentSlide === index ? 'hidden' : 'visible' }}
                onTouchStart={handleTouchStart}
              />
            </div>
          </Fragment>
        ))}
        <div className='min-w-[40px]' onTouchStart={handleTouchStart} />
        <div className='min-w-[67.632vw]' onTouchStart={handleTouchStart} />
        <div className='min-w-[40px]' onTouchStart={handleTouchStart} />
      </div>
    </div>
  );
}
