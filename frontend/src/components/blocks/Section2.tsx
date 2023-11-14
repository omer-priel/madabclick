'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import RecommendedContentCard from '@/components/blocks/RecommendedContentCard';

import { Content } from '@/lib/api/schemas';
import cat1Icon from '@/public/cat-1.svg';
import cat4Icon from '@/public/cat-4.svg';
import startPart1Icon from '@/public/start-part-1.svg';
import startPart2Icon from '@/public/start-part-2.svg';

interface Props {
  recommendedContent: Content | null;
}

export default function Section2({ recommendedContent }: Props) {
  const t = useTranslations();

  return (
    <div className='w-full bg-[#F1F1F1] pt-[129.78px] pb-[87px]'>
      <div className='w-[1102.54px] h-fit mx-auto'>
        <div className='flex w-fit h-fit'>
          <Image
            className='w-[120px] h-[180px] rtl:ml-[61.16px] ltr:mr-[61.16px] mt-auto mb-[8px] object-cover ltr:scale-x-[-1]'
            alt=''
            src={cat1Icon}
            width='120'
            height='180'
          />
          <div className='w-fit h-fit'>
            <div
              className='w-[200px] top-[0px]
            text-black text-[40px]/[60px] font-black'
            >
              {t('section-2-title')}
            </div>
            <div
              className='w-[732px] top-[71px]
            text-black text-[20px]/[30px] font-normal'
            >
              {t('section-2-body')}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full mt-[108.67px]'>
        <div className='w-[1203px] h-[1px] mx-auto bg-black' />
        {!!recommendedContent && (
          <div className='w-[959px] h-[548px] mt-[92px] mx-auto'>
            <div className='w-full h-[60px]'>
              <div className='w-fit h-fit mx-auto text-black text-[40px]/[60px] font-black'>{t('section-2-recommended-label')}</div>
            </div>
            <div className='w-full mt-[28px]'>
              <div className='flex w-fit h-fit mx-auto text-black text-[40px]/[60px] font-black'>
                <RecommendedContentCard content={recommendedContent} />
                <div className='relative'>
                  <div className='absolute right-[-20px] top-0 text-[580px]/[406px] text-[#FFB636]'>1</div>
                  <Image
                    className='absolute w-[4.166vw] h-[10.677vw] top-[105px] right-[159px]'
                    alt=''
                    src={cat4Icon}
                    width='80'
                    height='205'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='relative w-[300px] h-[300px] mx-auto mt-[153px]'>
          <Image
            className='absolute w-[264.804px] h-[252.328px] left-[17.89px] top=0'
            alt=''
            src={startPart1Icon}
            width='264.804'
            height='252.328'
          />
          <Image
            className='absolute w-[235.324px] h-[294.634px] left-[31.89px] top-0'
            alt=''
            src={startPart2Icon}
            width='235.324'
            height='294.634'
          />
          <div className='absolute w-[350px] h-[24px] left-[-25px] top-[97px]'>
            <div className='flex w-fit mx-auto text-black text-[16px]/[24px] text-normal'>{t('section-2-share-body')}</div>
          </div>
          <div className='absolute w-[309px] h-[50px] left-[-4px] top-[142px]'>
            <a
              className='flex w-[309px] h-[50px] justify-center items-center no-underline text-white bg-[#00B2CA] rounded-[200px]'
              href={t('section-2-share-herf')}
              target='_black'
            >
              {t('section-2-share-label')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
