'use client';

import { useEffect } from 'react';

import TagManager from 'react-gtm-module';

import HomeDesktopPage from '@/components/pages/HomeDesktopPage';
import HomeMobilePage from '@/components/pages/HomeMobilePage';

import { ContentsSchema } from '@/lib/api/schemas';
import { useStore } from '@/store';

interface Props {
  data: ContentsSchema;
}

export default function HomePage({ data }: Props) {
  const device = useStore((state) => state.device);

  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-KJC4BZ7W',
    });
  }, []);

  if (device == 'mobile') {
    return <HomeMobilePage data={data} />;
  }

  return <HomeDesktopPage data={data} />;
}
