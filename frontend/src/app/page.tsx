'use client';

import { useEffect, useState } from 'react';

import ContentList from '@/components/blocks/ContentList';

import { Content } from '@/lib/db/schemas';

export default function Page() {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    fetch('/api/get-contents  ', {
      cache: 'no-cache',
    }).then(async (res) => {
      const value = await res.json();
      setContents(value);
    });
  }, [setContents]);

  return (
    <div className='App'>
      <ContentList contents={contents} />
    </div>
  );
}
