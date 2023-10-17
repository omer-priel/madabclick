'use client';

import { useState } from 'react';

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
    <div className="relative bg-whitesmoke w-full h-[2562px] overflow-hidden text-left text-base text-black font-running-text-light">
      <Header locale={locale} />
      <div className='absolute top-[1223px] left-[calc(50%_-_238px)]'>
        <SearchBox placeholder="חפש" value={searchText} onChange={setSearchText} />
      </div>
      <div className="absolute top-[1324px] left-[1293px]">
        <MultiSelect
          label='תחום'
          options={domains}
          value={selectedDomains}
          onChange={setSelectedDomains}
        />
      </div>
      <div className="absolute top-[1324px] left-[1074px]">
        <MultiSelect
          label='גיל'
          options={ageLevels}
          value={selectedAgeLevels}
          onChange={setSelectedAgeLevels}
        />
      </div>
      <div className="absolute top-[1324px] left-[817px]">
        <MultiSelect
          label='משך זמן'
          options={durations}
          value={selectedDurations}
          onChange={setSelectedDurations}
        />
      </div>
      <div className="absolute top-[1324px] left-[585px]">
        <MultiSelect
          label='שפה'
          options={languages}
          value={selectedLanguages}
          onChange={setSelectedLanguages}
        />
      </div>
      <div className="absolute top-[1450px] left-[0px]">
      <div className='grid grid-cols-4 w-[1820px] px-[58px] gap-x-[70px] gap-y-[168px]'>
        {contents.map((content) => (
          <div key={content.index} className={"bg-gainsboro w-[400px] h-[400px]" + (showContentCard(content) ? "" : " hidden")}>
            <ContentCard content={content} title={content.title} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
