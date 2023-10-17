'use client';

import MultiSelect from '@/components/atoms/MultiSelect';
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
      <div className="absolute top-[216px] left-[0px] [background:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)] w-[1920px] h-[960px]" />
      <div className="absolute top-[315px] left-[1123px] w-[619px] h-[619px]" />
      <div className="absolute top-[1223px] left-[calc(50%_-_238px)] w-[476px] h-[55px] text-right text-gray-300">
        <div className="absolute top-[4px] left-[calc(50%_-_238px)] rounded-[50px] bg-gray-200 box-border w-[476px] h-12 border-[1px] border-solid border-gray-300" />
        <div className="absolute top-[15px] left-[325px] uppercase font-light inline-block w-12 h-[26px]">{`חיפוש `}</div>
        <img
          className="absolute top-[0px] left-[calc(50%_+_159px)] w-[55px] h-[55px] overflow-hidden"
          alt=""
          src="/vaadinglasses.svg"
        />
      </div>
      <ContentListV2 data={data} />
    </div>
  );
}
