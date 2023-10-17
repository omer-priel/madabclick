'use client';

import MultiSelect from '@/components/atoms/MultiSelect';
import SearchBox from '@/components/atoms/SearchBox';
import Header from '@/components/blocks/Header'
import ContentListV2 from '@/components/blocks/ContentListV2';

import { ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default function HomePage({ data, locale }: Props) {
  return (
    <div className="relative bg-whitesmoke w-full h-[2562px] overflow-hidden text-left text-base text-black font-running-text-light">
      <Header locale={locale} />
      <SearchBox label="חיפש" value="" onChange={(value) => {}} />
      <div className="absolute top-[1324px] left-[1293px]">
        <MultiSelect
          label='תחום'
          options={['פיזיקה ואסטרונומיה', 'מתמטיקה', 'כימיה']}
          value={['פיזיקה ואסטרונומיה']}
          onChange={(values) => {}}
        />
      </div>
      <div className="absolute top-[1324px] left-[1074px]">
        <MultiSelect
          label='גיל'
          options={['פיזיקה ואסטרונומיה', 'מתמטיקה', 'כימיה']}
          value={['פיזיקה ואסטרונומיה']}
          onChange={(values) => {}}
        />
      </div>
      <div className="absolute top-[1324px] left-[817px]">
        <MultiSelect
          label='משך זמן'
          options={['פיזיקה ואסטרונומיה', 'מתמטיקה', 'כימיה']}
          value={['פיזיקה ואסטרונומיה']}
          onChange={(values) => {}}
        />
      </div>
      <div className="absolute top-[1324px] left-[585px]">
        <MultiSelect
          label='שפה'
          options={['פיזיקה ואסטרונומיה', 'מתמטיקה', 'כימיה']}
          value={['פיזיקה ואסטרונומיה']}
          onChange={(values) => {}}
        />
      </div>
      <ContentListV2 data={data} />
    </div>
  );
}
