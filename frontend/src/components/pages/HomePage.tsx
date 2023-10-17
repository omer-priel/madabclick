import Header from '@/components/blocks/Header'

import { ContentsSchema } from '@/lib/api/schemas';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default function HomePage({ data, locale }: Props) {
  return (
    <div className="relative bg-whitesmoke w-full h-[2562px] overflow-hidden text-left text-base text-black font-running-text-light">
      <Header locale={locale} />
      <b className="absolute top-[1324px] left-[1293px]">תחום</b>
      <b className="absolute top-[1324px] left-[1074px]">גיל</b>
      <b className="absolute top-[1324px] left-[817px]">משך זמן</b>
      <b className="absolute top-[1324px] left-[585px]">שפה</b>
      <div className="absolute top-[216px] left-[0px] [background:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)] w-[1920px] h-[960px]" />
      <div className="absolute top-[315px] left-[1123px] w-[619px] h-[619px]" />
      <img
        className="absolute top-[1324px] left-[1338px] w-[25px] h-[25px]"
        alt=""
        src="/dashiconsarrowup.svg"
      />
      <img
        className="absolute top-[1324px] left-[1098px] w-[25px] h-[25px]"
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <img
        className="absolute top-[1324px] left-[877px] w-[25px] h-[25px]"
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <img
        className="absolute top-[1324px] left-[620px] w-[25px] h-[25px]"
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <div className="absolute top-[1223px] left-[calc(50%_-_238px)] w-[476px] h-[55px] text-right text-gray-300">
        <div className="absolute top-[4px] left-[calc(50%_-_238px)] rounded-[50px] bg-gray-200 box-border w-[476px] h-12 border-[1px] border-solid border-gray-300" />
        <div className="absolute top-[15px] left-[325px] uppercase font-light inline-block w-12 h-[26px]">{`חיפוש `}</div>
        <img
          className="absolute top-[0px] left-[calc(50%_+_159px)] w-[55px] h-[55px] overflow-hidden"
          alt=""
          src="/vaadinglasses.svg"
        />
      </div>
      <div className="absolute top-[1450px] left-[1468px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1450px] left-[998px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1358px] left-[1141px] rounded-[5px] bg-white shadow-[0px_1px_1px_rgba(0,_0,_0,_0.25)] w-[216px] h-[189px]" />
      <div className="absolute top-[1450px] left-[528px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1450px] left-[58px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[1468px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[998px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[528px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[58px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1378px] left-[1149px] w-[201px] h-[150px]">
        <div className="absolute top-[0px] left-[0px] w-[201px] h-[150px]">
          <div className="absolute top-[42px] left-[24px] uppercase font-light">
            פיזיקה ואסטרונומיה
          </div>
          <div className="absolute top-[0px] left-[127px] uppercase font-light">
            הכל
          </div>
          <div className="absolute top-[81px] left-[0px] bg-gainsboro w-[201px] h-8" />
          <div className="absolute top-[84px] left-[87px] uppercase font-light">
            מתמטיקה
          </div>
          <div className="absolute top-[126px] left-[117px] uppercase font-light">
            כימיה
          </div>
        </div>
        <img
          className="absolute top-[3.04px] left-[167.25px] w-[18.94px] h-[18.55px]"
          alt=""
          src="/star-1.svg"
        />
        <img
          className="absolute top-[86px] left-[167.49px] w-5 h-5"
          alt=""
          src="/star-2.svg"
        />
        <img
          className="absolute top-[45px] left-[167.49px] w-5 h-5"
          alt=""
          src="/star-3.svg"
        />
        <img
          className="absolute top-[128px] left-[167.49px] w-5 h-5"
          alt=""
          src="/star-2.svg"
        />
      </div>
    </div>
  );
}
