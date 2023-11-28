'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import ContentGalleryMobile from '@/components/blocks/ContentGalleryMobile';
import MobileHeader from '@/components/blocks/MobileHeader';
import MobileRecommendedContentCard from '@/components/blocks/MobileRecommendedContentCard';

import { ContentsSchema } from '@/lib/api/schemas';

interface ScreanSize {
  width: number;
  height: number;
}

function getScreanSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

interface Props {
  data: ContentsSchema;
}

export default function HomeMobilePage({ data }: Props) {
  const t = useTranslations();

  const [screenSize, setScreenSize] = useState<ScreanSize>({ width: 896, height: 414 });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(getScreanSize());
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [setScreenSize]);

  return (
    <div
      className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-[#111313] text-base text-black
    rtl:text-right ltr:text-left'
    >
      <MobileHeader data={data} />
      <div className='relative w-full'>
        <div className='absolute w-full left-0 top-0'>
          <Image
            className='w-[250px] h-[250px] mx-[calc(50%_-_125px)] mt-[16px] rounded-[125px]'
            alt=''
            src='/section-1-background.png'
            width={250}
            height={250}
          />
        </div>
        <div className='relative h-fit pt-[209px]'>
          <div className='w-[317px] mx-auto text-center text-[12px]/[18px] font-black text-[#FFB636]'>{t('section-1-title-part-1')}</div>
          <div className='w-[317px] mx-auto text-center	text-[22px]/[39px] font-black text-[#FFB636]'>{t('section-1-title-part-2')}</div>
          <div
            className='w-[317px] mx-auto
            text-center	text-[12px]/[18px] font-normal text-white break-words'
          >
            {t('section-1-body')}
          </div>
        </div>
      </div>
      {data.recommendedContent ? (
        <div className='w-[317px] rtl:mr-[34px] ltr:ml-[34px] mt-[44px] text-[16px]/[24px] font-black text-white'>
          {t('section-2-recommended-label')}
        </div>
      ) : (
        <div className='w-full h-[44px]' />
      )}
      {data.recommendedContent && <MobileRecommendedContentCard content={data.recommendedContent} screenWidth={screenSize.width} />}
      <div className='w-full h-[36px]' />
      {data.domains.map((domain) => (
        <div key={domain} className='w-full text-white'>
          <div className='w-full h-[8px] bg-[#272727]' />
          <div className='pt-[25px] pb-[16px] px-[32px]'>
            <div className='text-[16px]/[24px]'>{domain}</div>
            <ContentGalleryMobile contents={data.contents.filter((content) => content.domain === domain)} />
          </div>
        </div>
      ))}
      <div className='w-full h-[8px] bg-[#272727]' />
      <div className='w-full h-[89px]' />
      {/* <div className='fixed w-full h-[89px] right-0 bottom-0 bg-black text-white text-[8px]/[12px]'>
        <div className='flex w-auto h-auto mx-[58px] my-[26px] ltr:flex-row-reverse'>
          <div className='ml-auto'>
            <div className='w-fit mx-auto'>
              <Image alt='w-[20px] h-[20px]' src={mobileFooterHomeIcon} width='20' height='20' />
            </div>
            <div className='mx-auto'>{t('footer-mobile-home')}</div>
          </div>
          <div className='mr-auto'>
            <div className='w-fit mx-auto'>
              <Image alt='w-[20px] h-[20px]' src={mobileFooterSearchIcon} width='20' height='20' />
            </div>
            <div className='mx-auto'>{t('footer-mobile-search')}</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
