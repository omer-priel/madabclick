'use client';

import Footer from '@/components/blocks/Footer';
import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';
import Section2 from '@/components/blocks/Section2';
import SectionContents from '@/components/blocks/SectionContents';

import { ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
}

export default function HomeDesktopPage({ data }: Props) {
  return (
    <div
      className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black
    rtl:text-right ltr:text-left'
    >
      <Header />
      <Section1 />
      <Section2 recommendedContent={data.recommendedContent} />
      <SectionContents data={data} />
      <Footer />
    </div>
  );
}
