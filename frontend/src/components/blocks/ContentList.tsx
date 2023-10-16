'use client';

import { Fragment, useState } from 'react';

import { useTranslations } from 'next-intl';

import ContentCard from '@/components/blocks/ContentCard';

import { Content, ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
}

export default function ContentList({ data }: Props) {
  const { currentLanguage, languages, domains, ageLevels, durations, recommendedContent, contents } = data;

  const t = useTranslations();

  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [selectedAgeLevel, setSelectedAgeLevel] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([currentLanguage]);
  const [searchText, setSearchText] = useState<string>('');

  const handleDomainChange = (domain: string) => {
    if (domain == 'ALL') {
      setSelectedDomain([]);
    } else {
      setSelectedDomain([domain]);
    }
  };

  const handleAgeLevelChange = (ageLevel: string) => {
    if (ageLevel == 'ALL') {
      setSelectedAgeLevel([]);
    } else {
      setSelectedAgeLevel([ageLevel]);
    }
  };

  const handleDurationChange = (duration: string) => {
    if (duration == 'ALL') {
      setSelectedDuration([]);
    } else {
      setSelectedDuration([duration]);
    }
  };

  const handleLanguageChange = (language: string) => {
    if (language == 'ALL') {
      setSelectedLanguage([]);
    } else {
      setSelectedLanguage([language]);
    }
  };

  const searchValue = searchText.trim().length > 2 ? searchText.trim() : '';

  const showContentCard = (content: Content) => {
    return (
      (selectedDomain.length === 0 || selectedDomain.includes(content.domain)) &&
      (selectedAgeLevel.length === 0 || selectedAgeLevel.includes(content.ageLevel)) &&
      (selectedDuration.length === 0 || selectedDuration.includes(content.duration)) &&
      (selectedLanguage.length === 0 || selectedLanguage.includes(content.language)) &&
      (!searchValue || content.domain.includes(searchValue) || content.title.includes(searchValue))
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
              value={selectedDomain.length === 0 ? selectedDomain[0] : 'ALL'}
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
              value={selectedAgeLevel.length === 0 ? selectedAgeLevel[0] : 'ALL'}
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
              value={selectedDuration.length === 0 ? selectedDuration[0] : 'ALL'}
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
              value={selectedLanguage.length === 0 ? selectedLanguage[0] : 'ALL'}
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
        {recommendedContent && (
          <div className='mx-auto sm:col-span-2 lg:col-span-4 sm:w-1/2 lg:w-1/4'>
            <ContentCard content={recommendedContent} title={recommendedContent.title + ' - ' + t('recommended')} />
          </div>
        )}
        {contents.map(
          (content) =>
            (!recommendedContent || content.index !== recommendedContent.index) && (
              <Fragment key={content.index}>
                <ContentCard content={content} title={content.title} hidden={!showContentCard(content)} />
              </Fragment>
            )
        )}
      </div>
    </>
  );
}
