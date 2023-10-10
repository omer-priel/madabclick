'use client';

import { useEffect, useState } from 'react';

import { getContents } from '@/lib/db/requests';
import { Content } from '@/lib/db/schemas';

import ContentList from '@/components/blocks/ContentList';

const contentsFake = [
  {
    domain: 'AAA',
    ageLevel: 'a-b',
    name: 'Video 1',
    description: 'Description for Video 1',
    link: 'https://www.youtube.com/watch?v=G-YlfXtW7Yc',
  },
  {
    domain: 'BBB',
    ageLevel: 'c-d',
    name: 'Video 2',
    description: 'Description for Video 2',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID_2',
  },
  {
    domain: 'BBB',
    ageLevel: 'a-b',
    name: 'Video 3',
    description: 'Description for Video 3',
    link: 'https://www.youtube.com/watch?v=G-YlfXtW7Yc',
  },
  {
    domain: 'AAA',
    ageLevel: 'c-d',
    name: 'Video 4',
    description: 'Description for Video 4',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID_2',
  },
  {
    domain: 'AAA',
    ageLevel: 'e-f',
    name: 'Video 5',
    description: 'Description for Video 5',
    link: 'https://www.youtube.com/watch?v=G-YlfXtW7Yc',
  },
  {
    domain: 'AAA',
    ageLevel: 'e-f',
    name: 'נושא השיעור: אורחים בגינה',
    description: 'אחר',
    // eslint-disable-next-line max-len
    link: 'https://pop.education.gov.il/sherutey-tiksuv-bachinuch/vod-broadcasts/realtime-vod-17-6-2020/science-technology-kindergarten-17181/',
  },
];

export default function Page() {
  const [contents, setContents] = useState<Content[]>(contentsFake);

  useEffect(() => {
    setContents(getContents);
  }, [setContents])

  return (
    <div className='App'>
      <ContentList contents={contents} />
    </div>
  );
}
