'use client';

import { Fragment, useState } from 'react';

interface Content {
  name: string;
  domain: string;
  ageLevel: string;
  description: string;
  link: string;
}

type ContentType = 'youtube' | 'other';

function getContentType(content: Content): ContentType {
  if (content.link.startsWith('https://www.youtube.com')) {
    return 'youtube';
  }

  return 'other';
}

interface ContentCardProp {
  content: Content;
}

function ContentCard({ content }: ContentCardProp) {
  let iframeSrc = content.link;

  const contentType = getContentType(content);

  if (contentType == 'youtube') {
    const videoID = content.link.match(/(?<=v=|\/embed\/|youtu.be\/|\/v\/|\/e\/|watch\?v=)([^#\&\?]+)/)?.[0];
    iframeSrc = 'https://www.youtube.com/embed/' + videoID;
  }

  return (
    <div className='bg-white border rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold'>{content.name}</h2>
      <p className='text-gray-600'>{content.domain}</p>
      <p className='text-gray-600'>{content.ageLevel}</p>
      <p>{content.description}</p>
      <a href={content.link} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
        לאתר
      </a>
      <div className='relative h-48'>
        {contentType == 'youtube' && (
          <iframe title={content.name} src={iframeSrc} className='absolute inset-0 w-full h-full' allowFullScreen></iframe>
        )}
      </div>
    </div>
  );
}

interface Props {
  contents: Content[];
}

export default function ContentList({ contents }: Props) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedAgeLevel, setSelectedAgeLevel] = useState<string | null>(null);

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain === 'הכל' ? null : domain);
  };

  const handleAgeLevelChange = (ageLevel: string) => {
    setSelectedAgeLevel(ageLevel === 'הכל' ? null : ageLevel);
  };

  const filteredContents = contents.filter((content) => {
    return (!selectedDomain || content.domain === selectedDomain) && (!selectedAgeLevel || content.ageLevel === selectedAgeLevel);
  });

  const domains = Array.from(new Set(contents.map((content) => content.domain))).sort();
  const ageLevels = Array.from(new Set(contents.map((content) => content.ageLevel))).sort();

  console.log({ domains, ageLevels });

  return (
    <div className='p-4' style={{ direction: 'rtl', textAlign: 'right' }}>
      <h1 className='text-2xl font-bold'>תוכן איכותי לילדים</h1>
      <p className='text-gray-600'>כותרת שנייה</p>
      <div className='my-4'>
        <div className='flex space-x-4'>
          <div>
            <label>תחום:</label>
            <select onChange={(e) => handleDomainChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='הכל'>הכל</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>גיל:</label>
            <select onChange={(e) => handleAgeLevelChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='הכל'>הכל</option>
              {ageLevels.map((ageLevel) => (
                <option key={ageLevel} value={ageLevel}>
                  {ageLevel}
                </option>
              ))}
            </select>
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
    </div>
  );
}
