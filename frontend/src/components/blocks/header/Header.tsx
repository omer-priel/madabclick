'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Props {
  locale: string;
}

export default function Header({ locale }: Props) {
  const t = useTranslations();

  return (
    <>
      <div className='relative w-full h-[216px]'>
        <div className='absolute w-[250px] h-[35px] top-[38px] right-[52px]'>
          <div className='flex'>
            <Image
              className='ml-[36px]'
              alt={t('choose-language')}
              src={'/choose-language.svg'}
              width='35'
              height='35'
            />
            <div className='h-[24px] ml-[36px] my-auto'>
              <a href='/he' className={'text-right hover:text-yellowgreen-200' + (locale == 'he' ? ' text-yellowgreen-200' : '')}>
                עברית
              </a>
            </div>
            <div className='h-[24px] ml-[36px] my-auto'>
              <a href='/en' className={'text-right hover:text-yellowgreen-200' + (locale == 'en' ? ' text-yellowgreen-200' : '')}>
                English
              </a>
            </div>
            <div className='h-[24px] my-auto'>
              <a href='/ar' className={'text-right hover:text-yellowgreen-200' + (locale == 'ar' ? ' text-yellowgreen-200' : '')}>
                عربي
              </a>
            </div>
          </div>
        </div>
        <div className='absolute top-[32px] left-[calc(50%_-_230px)] w-[460px] text-xl text-gray-100'>
          <Image className='absolute top-[0px] left-[302px] object-cover' alt='' src='/logo.png' width='121' height='121' />
          <div className='absolute top-[123px] left-[calc(50%_-_83px)]'>{t('site-description')}</div>
          <div className='absolute top-[15px] left-[0px] w-[460px] h-[114px] text-77xl text-black font-rubik'>
            <b className='absolute top-[0px] left-[395px]'>מ</b>
            <b className='absolute top-[0px] left-[0px] text-yellowgreen-100'>
              <span>{'דע '}</span>
              <span className='text-black'>בקליק</span>
            </b>
          </div>
          <Image className='absolute top-[151px] left-[126px]' alt='' src='/line-1.svg' width='175' height='4' />
        </div>
      </div>
      <div className='relative h-[960px]'>
        <Image className='absolute left-0 top-0 w-full h-full object-cover' alt='' src='/header-image.png' width='1920' height='960' />
        <div
          className='absolute left-0 top-0 w-full h-full
                    [background:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)]'
        />
        <div className='absolute top-[694px] left-[1208px] text-[40px] font-black text-white text-right'>{t('header-line-1')}</div>
        <div className='absolute top-[731px] left-[1238px] inline-block w-[419px] h-24 text-xl font-black text-white text-right'>
          <p className='m-0'>&nbsp;</p>
          <p className='m-0'>{t('header-line-2')}</p>
        </div>
      </div>
    </>
  );
}
