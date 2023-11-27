'use client';

import HomeDesktopPage from '@/components/pages/HomeDesktopPage';
import HomeMobilePage from '@/components/pages/HomeMobilePage';

import { ContentsSchema } from '@/lib/api/schemas';
import { useStore } from '@/store';

interface Props {
  data: ContentsSchema;
  mobileMode: boolean;
}

export default function HomePage({ data }: Props) {

  const device = useStore((state) => state.device);

  if (device == 'mobile') {
    return <HomeMobilePage data={data} />;
  }

  return <HomeDesktopPage data={data} />;
}
