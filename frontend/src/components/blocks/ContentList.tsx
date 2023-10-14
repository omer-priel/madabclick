'use client';

import { Fragment, useState } from 'react';

import { useTranslations } from 'next-intl';

import ContentCard from '@/components/blocks/ContentCard';

import { Content, ContentsSchema } from '@/lib/db/schemas';

interface Props {
  data: ContentsSchema;
}

export default function ContentList({ data }: Props) {
  const { contents, currentLanguage, languages, domains, ageLevels, durations } = data;

  const t = useTranslations();

  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedAgeLevel, setSelectedAgeLevel] = useState<string>('ALL');
  const [selectedDuration, setSelectedDuration] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentLanguage);
  const [searchText, setSearchText] = useState<string>('');

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
  };

  const handleAgeLevelChange = (ageLevel: string) => {
    setSelectedAgeLevel(ageLevel);
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const searchValue = searchText.trim().length > 2 ? searchText.trim() : '';

  const showContentCard = (content: Content) => {
    return (
      (selectedDomain === 'ALL' || content.domain === selectedDomain) &&
      (selectedAgeLevel === 'ALL' || content.ageLevel === selectedAgeLevel) &&
      (selectedDuration === 'ALL' || content.duration === selectedDuration) &&
      (selectedLanguage === 'ALL' || content.language === selectedLanguage) &&
      (!searchValue || content.domain.includes(searchValue) || content.name.includes(searchValue))
    );
  };

  return (
    <>
      <div className='my-4'>
        <div className='flex flex-wrap items-center justify-center'>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('domain')}:</label>
            <select
              className='px-2 py-1 border rounded-md'
              onChange={(e) => handleDomainChange(e.target.value)}
              value={selectedDomain}
              defaultValue={'ALL'}
            >
              <option value='ALL'>{t('all')}</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('age-level')}:</label>
            <select
              className='px-2 py-1 border rounded-md'
              onChange={(e) => handleAgeLevelChange(e.target.value)}
              value={selectedAgeLevel}
              defaultValue={'ALL'}
            >
              <option value='ALL'>{t('all')}</option>
              {ageLevels.map((ageLevel) => (
                <option key={ageLevel} value={ageLevel}>
                  {ageLevel}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('duration')}:</label>
            <select
              className='px-2 py-1 border rounded-md'
              onChange={(e) => handleDurationChange(e.target.value)}
              value={selectedDuration}
              defaultValue={'ALL'}
            >
              <option value='ALL'>{t('all')}</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('language')}:</label>
            <select
              className='px-2 py-1 border rounded-md'
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={selectedLanguage}
              defaultValue={currentLanguage}
            >
              <option value='ALL'>{t('all')}</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('search')}:</label>
            <input type='text' onChange={(e) => setSearchText(e.target.value)} className='px-2 py-1 border rounded-md' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {contents.map((content) => (
          <Fragment key={content.index}>
            <ContentCard content={content} hidden={!showContentCard(content)} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
