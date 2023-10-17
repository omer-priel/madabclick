import { getLocaleDirection } from "@/translation";

interface Props {
  locale: string;
}

export default function Header({ locale } : Props) {

  return (
    <>
      <div className="absolute top-[37px] left-[70px] w-[63px] h-6">
        <a href='/he' className={"text-right hover:text-yellowgreen-200" + (locale == "he" ? " text-yellowgreen-200" : "")}>
          עברית
        </a>
      </div>
      <div className="absolute top-[37px] left-[150px] w-16 h-6">
        <a href='/en' className={"text-right hover:text-yellowgreen-200" + (locale == "en" ? " text-yellowgreen-200" : "")}>
          ENGLISH
        </a>
      </div>
      <div className="absolute top-[37px] left-[260px] w-16 h-6">
        <a href='/ar' className={"text-right hover:text-yellowgreen-200" + (locale == "ar" ? " text-yellowgreen-200" : "")}>
          عربي
        </a>
      </div>
      <div className="absolute top-[32px] left-[730px] w-[460px] h-[153px] text-xl text-gray-100">
        <img
          className="absolute top-[0px] left-[302px] w-[121px] h-[121px] object-cover"
          alt=""
          src="/image-1@2x.png"
        />
        <div className="absolute top-[123px] left-[calc(50%_-_83px)]">
          תוכן לילדים סקרנים
        </div>
        <div className="absolute top-[15px] left-[0px] w-[460px] h-[114px] text-77xl text-black font-rubik">
          <b className="absolute top-[0px] left-[395px]">מ</b>
          <b className="absolute top-[0px] left-[0px] text-yellowgreen-100">
            <span>{'דע '}</span>
            <span className="text-black">בקליק</span>
          </b>
        </div>
        <img
          className="absolute top-[151px] left-[126px] w-[175px] h-1"
          alt=""
          src="/line-1.svg"
        />
      </div>
      <img
        className="absolute top-[216px] left-[0px] w-[1920px] h-[960px] object-cover"
        alt=""
        src="/rectangle-18@2x.png"
      />
      <div className="absolute top-[216px] left-[0px] [background:linear-gradient(-75.99deg,_rgba(0,_0,_0,_0.5)_27.99%,_rgba(0,_0,_0,_0)_96.51%)] w-[1920px] h-[960px]" />
      <div className="absolute top-[910px] left-[1208px] text-[40px] font-black text-white text-right">
        שלום לכל הילדות והילדים
      </div>
      <div className="absolute top-[947px] left-[1238px] text-xl font-black text-white text-right inline-block w-[419px] h-24">
        <p className="m-0">&nbsp;</p>
        <p className="m-0">{'מוזמנים לצפות איתי בסרטונים מדעיים מרתקים בכל התחומים ולכל הגילאים '}</p>
      </div>
    </>
  );
}
