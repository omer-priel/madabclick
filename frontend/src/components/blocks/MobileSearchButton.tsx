'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Content, ContentsSchema } from '@/lib/api/schemas';
import mobileSearchArrowIcon from '@/public/mobile-search-arrow.svg';
import mobileSearchIcon from '@/public/mobile-search.svg';
import searchIcon from '@/public/search-icon.svg';
import { useStore } from '@/store';

interface Props {
  data: ContentsSchema;
}

export default function MobileSearchButton({ data }: Props) {
  const t = useTranslations();

  const deactivatePlayer = useStore((state) => state.deactivatePlayer);

  const [opened, setOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const moveToContent = (content: Content) => {
    const domainEl = document.getElementById(`content-${content.index}`);

    setOpened(false);

    if (domainEl) {
      domainEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  };

  return (
    <div>
      <Image
        className='w-[24px] h-[24px]'
        alt=''
        src={mobileSearchIcon}
        width='24'
        height='24'
        onClick={() => {
          setOpened(true);
          deactivatePlayer();
        }}
      />
      <div className={`right-0 top-0 w-[100vw] h-[100vh] bg-[#111313] text-white z-[50] ${opened ? 'fixed' : 'hidden'}`}>
        <div className='flex w-full mt-[50px] mx-[20px]'>
          <Image
            className='w-[20px] h-[20px] rtl:pr-[10px] ltr:pl-[10px] rtl:pl-[27px] ltr:pr-[27px] py-[10px]'
            alt=''
            src={mobileSearchArrowIcon}
            width='20'
            height='20'
            onClick={() => {
              setOpened(false);
            }}
          />
          <div
            className='flex rtl:justify-left ltr:justify-right w-[317px] h-[40px] bg-[#D9D9D980] opacity-30
                      rounded-[5px] box-border border border-solid border-[#00000040]'
          >
            <Image className='w-[25px] h-[25px] rtl:pr-[16px] ltr:pl-[16px] mt-[7px]' alt='' src={searchIcon} width='25' height='25' />
            <input
              type='text'
              className='w-full h-[18px] mx-[26.96px] my-[11px] text-[12px]/[18px] font-light bg-transparent
              text-white placeholder:text-white'
              style={{ outline: 'none' }}
              value={searchValue}
              placeholder={t('search')}
              onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className='mx-[20px] mt-[54px]'>
          {searchValue.length > 3 && (
            <>
              {data.contents
                .filter((content) => content.language === data.currentLanguageValue && content.title.toLowerCase().includes(searchValue))
                .map((content) => (
                  <div key={content.index} className='flex mb-[7px]'>
                    {content.youtube && (
                      <div
                        className='w-[153px] h-[85px]'
                        onClick={() => {
                          moveToContent(content);
                        }}
                      >
                        {content.youtube.thumbnail.width && content.youtube.thumbnail.height ? (
                          <Image
                            className='w-[153px] h-[85px]'
                            src={content.youtube.thumbnail.url}
                            alt={content.title}
                            width={content.youtube.thumbnail.width}
                            height={content.youtube.thumbnail.height}
                          />
                        ) : (
                          <Image className='w-[153px] h-[85px]' src={content.youtube.thumbnail.url} alt={content.title} fill />
                        )}
                      </div>
                    )}
                    <div
                      className='w-[132px] mx-[24px] mt-[24px] text-[12px]/[18px]'
                      onClick={() => {
                        moveToContent(content);
                      }}
                    >
                      {content.title}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
