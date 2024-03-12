'use client';

import { useTranslations } from 'next-intl';

import CardAboutUs from '@/components/blocks/CardAboutUs';
import CardAboutUsWithoutBackground from '@/components/blocks/CardAboutUsWithoutBackground';
import Footer from '@/components/blocks/Footer';
import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';

import adi from '@/public/Adi.svg';
import hiya from '@/public/Hiya.svg';
import mishal from '@/public/Mishal.svg';
import noam from '@/public/Noam.svg';
import omer from '@/public/Omer.svg';
import cat5 from '@/public/cat-5About.svg';

export default function AboutUsPage() {
  const t = useTranslations();
  return (
    <div
      className='relative w-full mx-full overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base
    text-black rtl:text-right ltr:text-left justify-end'
    >
      <Header />
      <Section1 />
      <div className='flex w-full justify-center items-center'>
        <CardAboutUsWithoutBackground
          littleTitle={t('section-2-about-little-title')}
          title={t('section-2-about-title')}
          description={t('section-2-about-body')}
          imageSrc={cat5}
        />
      </div>

      {/*three rows of 2 blocks each */}
      <div className='w-full mt-10 max-md:max-w-full max-md:mt-5'>
        <div className=' flex max-md:flex-col max-md:items-stretch max-md:gap-0'>
          <div className='flex flex-col items-stretch w-full max-md:w-[46%] mr-44 mb-5'>
            <CardAboutUs
              littleTitle={t('section-2-project-manager-little')}
              title={t('section-2-project-manager')}
              description={t('section-2-project-manager-description')}
              imageSrc={noam}
            />
          </div>

          <div className='flex flex-col items-stretch w-full max-md:w-[46%] ml-44 mb-5'>
            <CardAboutUs
              littleTitle={t('section-2-software-manager-little')}
              title={t('section-2-software-manager')}
              description={t('section-2-software-manager-description')}
              imageSrc={omer}
            />
          </div>
        </div>
      </div>

      <div className='w-full mt-10 max-md:max-w-full max-md:mt-5'>
        <div className='gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0'>
          <div className='flex flex-col items-stretch w-full max-md:w-[46%] mr-44 mb-5 max-md:ml-0'>
            <CardAboutUs
              littleTitle={t('section-2-hebrew-content-manager-little')}
              title={t('section-2-hebrew-content-manager')}
              description={t('section-2-hebrew-content-manager-description')}
              imageSrc={mishal}
            />
          </div>

          <div className='flex flex-col items-stretch w-full max-md:w-[46%] ml-44 mb-5 max-md:ml-0'>
            <CardAboutUs
              littleTitle={t('section-2-arabic-content-manager-little')}
              title={t('section-2-arabic-content-manager')}
              description={t('section-2-arabic-content-manager-description')}
              imageSrc={hiya}
            />
          </div>
        </div>
      </div>

      <div className='w-full mt-10 max-md:max-w-full max-md:mt-5'>
        <div className='gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0'>
          <div className='flex flex-col items-stretch w-full max-md:w-[46%] mr-44  max-md:ml-0'>
            <CardAboutUs
              littleTitle={t('section-2-analytics-manager-little')}
              title={t('section-2-analytics-manager')}
              description={t('section-2-analytics-manager-description')}
              imageSrc={omer}
            />
          </div>

          <div className='flex flex-col items-stretch w-full max-md:w-[46%] ml-44  max-md:ml-0'>
            <CardAboutUs
              littleTitle={t('section-2-product-design-manager-little')}
              title={t('section-2-product-design-manager')}
              description={t('section-2-product-design-manager-description')}
              imageSrc={adi}
            />
          </div>
        </div>
      </div>
      <div className='w-full h-[100px]' />
      <Footer />
    </div>
  );
}
