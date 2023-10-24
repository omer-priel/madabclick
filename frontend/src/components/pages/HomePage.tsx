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
    <div className='w-full overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins'>
      <div className='relative w-[1920px] mx-auto'>
        <Header locale={locale} />
        <Section1 />
        <Section2 />
        <div className='relative w-full h-[1013px]'>
          <Image
            className='absolute w-[1920px] h-[1054px] left-0 top-0 object-cover'
            alt=''
            src='/section-3-background.png'
            width='1920'
            height='1054'
          />
          <div className='absolute w-full h-[64px] top-[110px]'>
            <div className='w-[644px] mx-auto'>
              <SearchBox placeholder={t('search')} value={searchText} onChange={setSearchText} />
            </div>
          </div>
          <div className='absolute w-full h-[823px] left-0 top-[347px]'>
            <div className='w-fit h-[60px] mx-auto text-white text-[40px]/[60px] font-black'>{t('section-3-title')}</div>
            <div className='w-fit mx-auto mt-[33px]'>{!!recommendedContent && <RecommendedContentCard content={recommendedContent} />}</div>
          </div>
        </div>
        <div className='w-full mt-[81px]'>
          <div className='w-fit h-[60px] mx-auto text-black text-[40px]/[60px] text-right font-black'>
            {t('contents-section-title')}
            <div className='w-[60px] h-[8px] mx-auto mt-[21px] bg-[#81B826]' />
          </div>
        </div>
        <div className='w-full mt-[69px]'>
          <div className='flex w-fit mx-auto'>
            <div className='w-fit ml-[66px]'>
              <MultiSelect label={t('filter-age-level')} options={ageLevels} value={selectedAgeLevels} onChange={setSelectedAgeLevels} />
            </div>
            <div className='w-fit ml-[66px]'>
              <MultiSelect label={t('filter-duration')} options={durations} value={selectedDurations} onChange={setSelectedDurations} />
            </div>
            <div className='w-fit'>
              <MultiSelect label={t('filter-language')} options={languages} value={selectedLanguages} onChange={setSelectedLanguages} />
            </div>
          </div>
        </div>
        <div className='w-full mt-[95px]'>
          {domains.map((domain) => (
            <div
              key={domain}
              className={
                'w-full mb-[98px] ' + (contents.find((content) => content.domain == domain && showContentCard(content)) ? '' : ' hidden')
              }
            >
              <div className='w-fit h-[36px] mx-auto text-black text-[24px]/[36px] text-right font-black'>{domain}</div>
              <div className='flex flex-nowrap mt-[33px] overflow-x-scroll'>
                <div className='flex h-fit mx-auto'>
                  {contents
                    .filter((content) => content.domain == domain)
                    .map((content) => (
                      <div key={content.index} className={'ml-[35px] ' + (showContentCard(content) ? '' : ' hidden')}>
                        <ContentCard content={content} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
