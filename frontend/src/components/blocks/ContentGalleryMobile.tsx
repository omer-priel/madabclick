'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import ContentCardMobile from '@/components/blocks/ContentCardMobile';

import { useStore } from '@/store';
import { Content } from '@/lib/api/schemas';

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

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
    }

    if (!sliderRef.current) {
      return;
    }

    const spaceEl = sliderRef.current.querySelector(':nth-child(1)');
    const spaceWidth = spaceEl ? spaceEl.clientWidth : 40;

    const slideEl = sliderRef.current.querySelector(':nth-child(2)');
    const slideWidth = slideEl ? slideEl.clientWidth : 40;

    let scrollLeft = - (index + 1) * (spaceWidth + slideWidth) - spaceWidth;
    scrollLeft += (document.body.clientWidth - slideWidth) / 2;

    currentTranslate.current = scrollLeft;

    sliderRef.current.scrollLeft = currentTranslate.current;
  }

  const handleMouseDown = (event: TouchEvent | MouseEvent) => {
    deactivatePlayer();

    if (!sliderRef.current) {
      return;
    }

    if (isDragging.current) {
      return;
    }

    if (!(event.target as HTMLElement).classList.contains('slider-draggable')) {
      return;
    }

    const x = ('touches' in event) ? event.touches[0].clientX : event.clientX;

    isDragging.current = true;
    startX.current = x;
  };

  const handleMouseMove = (event: TouchEvent | MouseEvent) => {
    if (!sliderRef.current) {
      return;
    }

    if (!isDragging.current) {
      return;
    }

    const x = ('touches' in event) ? event.touches[0].clientX : event.clientX;

    const distance = x - startX.current;
    sliderRef.current.scrollLeft = currentTranslate.current - distance;
  };

  const handleMouseUp = (event: TouchEvent | MouseEvent) => {
    if (!sliderRef.current) {
      return;
    }

    if (!isDragging.current) {
      return;
    }

    let toSlide = currentSlide;

    const slideEl = sliderRef.current.querySelector(':nth-child(2)');
    const slideWidth = slideEl ? slideEl.clientWidth : 40;

    if (currentTranslate.current - (slideWidth / 2) > sliderRef.current.scrollLeft) {
      if (currentSlide < contents.length - 1) {
        toSlide += 1;
      }
    } else if (currentTranslate.current + (slideWidth / 2) < sliderRef.current.scrollLeft) {
      if (currentSlide > 0) {
        toSlide -= 1;
      }
    }

    goToSlide(toSlide);

    isDragging.current = false;
  };

  useEffect(() => {
    goToSlide(0);
  }, [sliderRef.current]);

  return (
    <div className='flex flex-nowrap'>
      <div
      ref={sliderRef}
      className='flex rtl h-fit mx-auto overflow-x-hidden'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
        <div className='slider-draggable min-w-[40px]' />
        <div className='slider-draggable min-w-[67.632vw]' />
        {contents.map((content, index) => (
          <Fragment key={content.index}>
            <div className='slider-draggable min-w-[40px]' />
            <div className='relative w-[67.632vw] h-fit'>
              <div className='w-[67.632vw] h-fit z-1'>
                <ContentCardMobile content={content} />
              </div>
              <div
              className='slider-draggable absolute w-[67.632vw] h-full top-0 right-0 z-2'
              style={{visibility: currentSlide === index ? 'hidden' : 'visible'}}
              />
            </div>
          </Fragment>
        ))}
        <div className='slider-draggable min-w-[40px]' />
        <div className='slider-draggable min-w-[67.632vw]' />
        <div className='slider-draggable min-w-[40px]' />
      </div>
    </div>
  );
}
