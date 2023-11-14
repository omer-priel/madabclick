'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import ContentGallery from '@/components/blocks/ContentGallery';

import { Content, ContentsSchema } from '@/lib/api/schemas';
import cat3Icon from '@/public/cat-3.svg';

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
    <div className='relative w-full h-fit pt-[6.458vw]' style={{ background: 'linear-gradient(180deg, #00B2CA 56%, #04C2FF 100%)' }}>
      <div className='w-[31.25vw] mx-auto'>
        <SearchBox placeholder={t('search')} value={searchText} onChange={setSearchText} />
      </div>
      <div className='w-fit h-fit mx-auto mt-[4.27vw]'>
        <Image className='w-[114px] h-[80px]' alt='' src={cat3Icon} width='114' height='80' />
      </div>
      <div className='relative w-fit h-[60px] top-[-20px] mx-auto text-white text-[40px]/[60px] text-right font-black'>
        {t('section-contents-title')}
      </div>
      <div className='w-full mt-[36px]'>
        <div className='flex w-fit mx-auto'>
          <div className='w-fit ml-[34px] text-white text-[16px]/[24px] text-right font-light'>{t('section-contents-filters-label')}</div>
          <div className='w-fit ml-[34px]'>
            <MultiSelect label={t('filter-age-level')} options={ageLevels} values={selectedAgeLevels} onChange={setSelectedAgeLevels} />
          </div>
          <div className='w-fit ml-[34px]'>
            <MultiSelect label={t('filter-duration')} options={durations} values={selectedDurations} onChange={setSelectedDurations} />
          </div>
          <div className='w-fit'>
            <MultiSelect label={t('filter-language')} options={languages} values={selectedLanguages} onChange={setSelectedLanguages} />
          </div>
        </div>
      </div>
      <div className='w-full h-fit pb-[138px]'>
        {domains.map((domain) => (
          <div
            key={domain}
            className={
              'relative w-full mt-[81px]' +
              (contents.find((content) => content.domain == domain && showContentCard(content)) ? '' : ' hidden')
            }
          >
            <div className='w-fit h-[1.875vw] mx-auto text-white text-[24px]/[36px] text-right font-black'>{domain}</div>
            <ContentGallery contents={contents} domain={domain} showContentCard={showContentCard} />
          </div>
        ))}
      </div>
    </div>
  );
}
