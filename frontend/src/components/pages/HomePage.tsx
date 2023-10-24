'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import ContentCard from '@/components/blocks/ContentCard';
import Header from '@/components/blocks/Header';
import RecommendedContentCard from '@/components/blocks/RecommendedContentCard';
import Section1 from '@/components/blocks/Section1';
import Section2 from '@/components/blocks/Section2';

import { Content, ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default function HomePage({ data, locale }: Props) {
  const { currentLanguage, languages, domains, ageLevels, durations, recommendedContent, contents } = data;

  const t = useTranslations();

  const [selectedAgeLevels, setSelectedAgeLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([currentLanguage]);
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
    <div className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins'>
      <Header locale={locale} />
      <Section1 />
      <Section2 />
      <div className='relative w-full h-[52.76vw]'>
        <Image
          className='absolute w-full h-full left-0 top-0 object-cover'
          alt=''
          src='/section-3-background.png'
          width='1920'
          height='1013'
        />
        <div className='absolute w-full h-[3.333vw] top-[5.729vw]'>
          <div className='w-[33.541vw] mx-auto'>
            <SearchBox placeholder={t('search')} value={searchText} onChange={setSearchText} />
          </div>
        </div>
        <div className='absolute w-full h-[29.375vw] left-0 top-[18.072vw]'>
          <div className='w-fit h-[3.125vw] mx-auto text-white text-[2.083vw]/[3.125vw] font-black'>{t('section-3-title')}</div>
          <div className='w-fit mx-auto mt-[1.25vw]'>{!!recommendedContent && <RecommendedContentCard content={recommendedContent} />}</div>
        </div>
      </div>
      <div className='w-full mt-[4.218vw]'>
        <div className='w-fit h-[3.125vw] mx-auto text-black text-[2.083vw]/[3.125vw] text-right font-black'>
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
      <div className='w-full min-h-[20.833vw] mt-[4.947vw]'>
        {domains.map((domain) => (
          <div
            key={domain}
            className={
              'w-full mb-[5.104vw] ' + (contents.find((content) => content.domain == domain && showContentCard(content)) ? '' : ' hidden')
            }
          >
            <div className='w-fit h-[1.875vw] mx-auto text-black text-[1.25vw]/[1.875vw] text-right font-black'>{domain}</div>
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
        ))}
      </div>
      <div className='w-full h-[5.208vw]' />
    </div>
  );
}
