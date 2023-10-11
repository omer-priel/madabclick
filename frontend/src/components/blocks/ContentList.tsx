'use client';

import { Fragment, useState } from 'react';

import { useTranslations } from 'next-intl';

import ContentCard from '@/components/blocks/ContentCard';

import { ContentsSchema } from '@/lib/db/schemas';

interface Props {
  data: ContentsSchema;
}

export default function ContentList({ data }: Props) {
  const { contents, languages, domains, ageLevels } = data;

  const t = useTranslations();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedAgeLevel, setSelectedAgeLevel] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language === 'ALL' ? null : language);
  };

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain === 'ALL' ? null : domain);
  };

  const handleAgeLevelChange = (ageLevel: string) => {
    setSelectedAgeLevel(ageLevel === 'ALL' ? null : ageLevel);
  };

  const searchValue = searchText.trim().length > 2 ? searchText.trim() : '';

  const filteredContents = contents.filter((content) => {
    return (
      (!selectedLanguage || content.language === selectedLanguage) &&
      (!selectedDomain || content.domain === selectedDomain) &&
      (!selectedAgeLevel || content.ageLevel === selectedAgeLevel) &&
      (!searchValue ||
        content.domain.includes(searchValue) ||
        content.name.includes(searchValue) ||
        content.description.includes(searchValue))
    );
  });

  return (
    <>
      <div className='my-4'>
        <div className='flex flex-wrap items-center justify-center'>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('domain')}:</label>
            <select onChange={(e) => handleDomainChange(e.target.value)} className='px-2 py-1 border rounded-md'>
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
            <select onChange={(e) => handleAgeLevelChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='ALL'>{t('all')}</option>
              {ageLevels.map((ageLevel) => (
                <option key={ageLevel} value={ageLevel}>
                  {ageLevel}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('language')}:</label>
            <select onChange={(e) => handleLanguageChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='הכל'>{t('all')}</option>
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
        {filteredContents.map((content, index) => (
          <Fragment key={index}>
            <ContentCard content={content} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
