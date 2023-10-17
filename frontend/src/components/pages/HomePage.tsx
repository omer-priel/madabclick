'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import Header from '@/components/blocks/Header'
import ContentCard from '@/components/blocks/ContentCard';

import { ContentsSchema, Content } from '@/lib/api/schemas';

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

  const searchValue = searchText.trim().length > 2 ? searchText.trim() : '';

  const showContentCard = (content: Content) => {
    return (
      (selectedDomains.length === 0 || selectedDomains.includes(content.domain)) &&
      (selectedAgeLevels.length === 0 || selectedAgeLevels.includes(content.ageLevel)) &&
      (selectedDurations.length === 0 || selectedDurations.includes(content.duration)) &&
      (selectedLanguages.length === 0 || selectedLanguages.includes(content.language)) &&
      (!searchValue || content.domain.includes(searchValue) || content.title.includes(searchValue))
    );
  };

  return (
    <div className="relative bg-whitesmoke w-full text-left text-base text-black font-running-text-light">
      <Header locale={locale} />
      <div className='absolute top-[1223px] left-[calc(50%_-_238px)]'>
        <SearchBox placeholder={t("search")} value={searchText} onChange={setSearchText} />
      </div>
      <div className="absolute top-[1324px] left-[1293px]">
        <MultiSelect
          label={t("domain")}
          options={domains}
          value={selectedDomains}
          onChange={setSelectedDomains}
        />
      </div>
      <div className="absolute top-[1324px] left-[1074px]">
        <MultiSelect
          label={t("age-level")}
          options={ageLevels}
          value={selectedAgeLevels}
          onChange={setSelectedAgeLevels}
        />
      </div>
      <div className="absolute top-[1324px] left-[817px]">
        <MultiSelect
          label={t("duration")}
          options={durations}
          value={selectedDurations}
          onChange={setSelectedDurations}
        />
      </div>
      <div className="absolute top-[1324px] left-[585px]">
        <MultiSelect
          label={t("language")}
          options={languages}
          value={selectedLanguages}
          onChange={setSelectedLanguages}
        />
      </div>
      <div className="absolute top-[1400px] left-[0px] w-full">
        <div className='grid grid-cols-4 w-[calc(100%_-_120px)] px-[58px] py-[50px] gap-x-[70px] gap-y-[168px]'>
          {recommendedContent && (
            <div className='mx-auto col-span-4 w-[400px] h-[400px] bg-gainsboro'>
              <ContentCard content={recommendedContent} title={recommendedContent.title + ' - ' + t('recommended')} />
            </div>
          )}
          {contents.map((content) => (
            <div key={content.index} className={"w-[400px] h-[400px] bg-gainsboro" + (showContentCard(content) ? "" : " hidden")}>
              <ContentCard content={content} title={content.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
