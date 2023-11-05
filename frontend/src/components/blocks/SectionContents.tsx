'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import ContentCard from '@/components/blocks/ContentCard';

import { Content, ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
}

export default function SectionContents({ data }: Props) {
  const { currentLanguageValue, languages, domains, ageLevels, durations, contents } = data;

  const t = useTranslations();

  const [selectedAgeLevels, setSelectedAgeLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([currentLanguageValue]);
  const [searchText, setSearchText] = useState<string>('');

  const searchValue = searchText.trim().length > 2 ? searchText.trim().toLowerCase() : '';

  const showContentCard = (content: Content) => {
    return (
      (selectedAgeLevels.length === 0 || selectedAgeLevels.includes(content.ageLevel)) &&
      (selectedDurations.length === 0 || selectedDurations.includes(content.duration)) &&
      (selectedLanguages.length === 0 || selectedLanguages.includes(content.language)) &&
      (!searchValue || content.domain.toLowerCase().includes(searchValue) || content.title.toLowerCase().includes(searchValue))
    );
  };

  return (
    <div className='relative w-full h-fit' style={{ background: 'linear-gradient(180deg, #088EB8 56%, #04C2FF 100%)' }}>
      <div className='w-[31.25vw] mx-auto pt-[6.458vw]'>
        <SearchBox placeholder={t('search')} value={searchText} onChange={setSearchText} />
      </div>
      <div className='w-fit h-fit mx-auto pt-[4.27vw]'>
        <Image className='w-[114px] h-[80px]' alt='' src='/cat-3.svg' width='114' height='80' />
      </div>
      <div className='relative w-fit h-[60px] top-[-20px] mx-auto text-white text-[40px]/[60px] text-right font-black'>
        {t('section-contents-title')}
      </div>
      <div className='w-fit h-[60px] mx-auto text-white text-[40px]/[60px] text-right font-black'>
         ש
      </div>
      {/* <div className='w-full mt-[4.218vw]'>
        <div className='w-fit h-[3.125vw] mx-auto text-black text-[40px]/[60px] text-right font-black'>
          {t('contents-section-title')}
          <div className='w-[3.125vw] h-[0.416vw] mx-auto mt-[1.093vw] bg-[#81B826]' />
        </div>
      </div>
      <div className='w-full mt-[3.593vw]'>
        <div className='flex w-fit mx-auto'>
          <div className='w-fit ml-[3.437vw]'>
            <MultiSelect label={t('filter-age-level')} options={ageLevels} value={selectedAgeLevels} onChange={setSelectedAgeLevels} />
          </div>
          <div className='w-fit ml-[3.437vw]'>
            <MultiSelect label={t('filter-duration')} options={durations} value={selectedDurations} onChange={setSelectedDurations} />
          </div>
          <div className='w-fit'>
            <MultiSelect label={t('filter-language')} options={languages} value={selectedLanguages} onChange={setSelectedLanguages} />
          </div>
        </div>
      </div>
      {domains.map((domain) => (
        <div
          key={domain}
          className={
            'w-full mb-[5.104vw] ' + (contents.find((content) => content.domain == domain && showContentCard(content)) ? '' : ' hidden')
          }
        >
          <div className='w-fit h-[1.875vw] mx-auto text-black text-[24px]/[36px] text-right font-black'>{domain}</div>
          <div className='flex flex-nowrap mt-[1.718vw] overflow-x-scroll'>
            <div className='flex h-fit mx-auto'>
              {contents
                .filter((content) => content.domain == domain)
                .map((content) => (
                  <div key={content.index} className={'ml-[1.822vw] ' + (showContentCard(content) ? '' : ' hidden')}>
                    <ContentCard content={content} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}
