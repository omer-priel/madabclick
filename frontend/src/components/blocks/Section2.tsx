'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import RecommendedContentCard from '@/components/blocks/RecommendedContentCard';

import { Content } from '@/lib/api/schemas';
import cat1Icon from '@/public/cat-1.svg';
import cat2Icon from '@/public/cat-2.svg';
import recommendedBackgroundIcon from '@/public/recommended-background.svg';

interface Props {
  recommendedContent: Content | null;
}

export default function Section2({ recommendedContent }: Props) {
  const t = useTranslations();

  return (
    <div className='relative w-full h-[68.177vw] bg-[#F1F1F1]'>
      <div className='absolute w-[51.041vw] right-[20.156vw] top-[6.041vw]'>
        <div className='relative'>
          <Image
            className='absolute w-[120px] h-[180px] right-[0px] top-[20px] object-cover'
            alt=''
            src={cat1Icon}
            width='120'
            height='180'
          />
          <div className='absolute w-[200px] h-[60px] right-[183px] top-[0px] text-black text-[40px]/[60px] text-right font-black'>
            {t('section-2-title')}
          </div>
          <div className='absolute w-[732px] h-[150px] right-[183px] top-[71px] text-black text-[20px]/[30px] text-right font-normal'>
            {t('section-2-body')}
          </div>
        </div>
      </div>
      {!!recommendedContent && (
        <div className='absolute w-[74.739vw] h-[37.083vw] right-[12.708vw] top-[24.427vw]'>
          <div className='relative'>
            <div
              className='absolute w-[74.739vw] h-[37.083vw] right-[-1.041vw] top-[-1.041vw] object-cover
          bg-[#088EB8] border-[1.041vw] border-[#088EB8] border-solid rounded-[0.52vw]'
            ></div>
            <div className='absolute w-[74.739vw] h-[37.083vw] right-0 top-0 object-cover'>
              <Image alt='' src={recommendedBackgroundIcon} fill />
            </div>
            <div className='absolute w-full h-[60px] top-[3.697vw]'>
              <div className='w-fit h-fit mx-auto text-white text-[40px]/[60px] text-right font-black'>
                {t('section-2-recommended-label')}
              </div>
            </div>
            <div className='absolute w-full top-[7.968vw]'>
              <div className='w-fit h-fit mx-auto text-white text-[40px]/[60px] text-right font-black'>
                <RecommendedContentCard content={recommendedContent} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!!recommendedContent && (
        <Image
          className='absolute w-[10.677vw] h-[4.166vw] right-[75.468vw] top-[19.791vw]'
          alt=''
          src={cat2Icon}
          width='205'
          height='80'
        />
      )}
    </div>
  );
}
