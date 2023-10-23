'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import ContentCard from '@/components/blocks/ContentCard';
import Header from '@/components/blocks/header/Header';

import { Content, ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default function HomePage({ data, locale }: Props) {
  const { currentLanguage, languages, domains, ageLevels, durations, recommendedContent, contents } = data;

  const t = useTranslations();

  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedAgeLevels, setSelectedAgeLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([currentLanguage]);
  const [searchText, setSearchText] = useState<string>('');

  const searchValue = searchText.trim().length > 2 ? searchText.trim().toLowerCase() : '';

  const showContentCard = (content: Content) => {
    return (
      (selectedDomains.length === 0 || selectedDomains.includes(content.domain)) &&
      (selectedAgeLevels.length === 0 || selectedAgeLevels.includes(content.ageLevel)) &&
      (selectedDurations.length === 0 || selectedDurations.includes(content.duration)) &&
      (selectedLanguages.length === 0 || selectedLanguages.includes(content.language)) &&
      (!searchValue || content.domain.toLowerCase().includes(searchValue) || content.title.toLowerCase().includes(searchValue))
    );
  };

  return (
    <div className='relative w-[1920px] font-poppins'>
      <Header locale={locale} />
      <div className='relative w-full h-[1054px]'>
        <Image
          className='absolute w-full h-full left-0 top-0 object-cover'
          alt=''
          src='/section-2-background.png'
          width='1920'
          height='1054'
        />
        <div className='absolute w-full h-[64px] top-[76px]'>
          <div className='w-[644px] mx-auto'>
            <SearchBox placeholder={t('search')} value={searchText} onChange={setSearchText} />
          </div>
        </div>
        <div className='absolute w-full h-[823px] left-0 top-[140px]'>
          <div className='w-fit h-[60px] mx-auto mt-[201px] text-black text-[40px]/[60px] font-black'>
            {t('section-2-title')}
            <Image className='block' alt='' src='/section-2-title-line.svg' width='126' height='5' />
          </div>
        </div>
      </div>
      <div className='flex justify-center w-full mt-[78px]'>
        <div className='grid grid-cols-4 w-[900px] rtl:pr-[112px] ltr:pl-[112px]'>
          <div className='w-fit'>
            <MultiSelect label={t('domain')} options={domains} value={selectedDomains} onChange={setSelectedDomains} />
          </div>
          <div className='w-fit'>
            <MultiSelect label={t('age-level')} options={ageLevels} value={selectedAgeLevels} onChange={setSelectedAgeLevels} />
          </div>
          <div className='w-fit'>
            <MultiSelect label={t('duration')} options={durations} value={selectedDurations} onChange={setSelectedDurations} />
          </div>
          <div className='w-fit'>
            <MultiSelect label={t('language')} options={languages} value={selectedLanguages} onChange={setSelectedLanguages} />
          </div>
        </div>
      </div>
      <div className='w-full mt-[50px]'>
        <div className='grid grid-cols-4 w-[calc(100%_-_120px)] px-[58px] py-[50px] gap-x-[70px] gap-y-[168px]'>
          {recommendedContent && (
            <div className='mx-auto col-span-4 w-[400px] h-[400px] bg-gainsboro'>
              <ContentCard content={recommendedContent} title={recommendedContent.title + ' - ' + t('recommended')} />
            </div>
          )}
          {contents.map((content) => (
            <div key={content.index} className={'w-[400px] h-[400px] bg-gainsboro' + (showContentCard(content) ? '' : ' hidden')}>
              <ContentCard content={content} title={content.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
