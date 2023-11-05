import Footer from '@/components/blocks/Footer';
import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';
import Section2 from '@/components/blocks/Section2';
import SectionContents from '@/components/blocks/SectionContents';

import { ContentsSchema } from '@/lib/api/schemas';
import { Language } from '@/translation';

interface Props {
  data: ContentsSchema;
  currentLanguage: Language;
}

export default function HomePage({ data, currentLanguage }: Props) {
  return (
    <div className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins'>
      <Header currentLanguage={currentLanguage} />
      <Section1 />
      <Section2 recommendedContent={data.recommendedContent} />
      {/* <SectionContents data={data} /> */}
      <Footer />
    </div>
  );
}
