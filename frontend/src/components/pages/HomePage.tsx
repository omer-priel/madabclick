
import { ContentsSchema } from '@/lib/api/schemas';

import styles from "@/styles/styles.module.css";

interface Props {
  data: ContentsSchema;
}

export default function HomePage({ data }: Props) {
  return (
    <div className={styles.homePage}>
      <img className={styles.homePageChild} alt="" src="/rectangle-18@2x.png" />
      <div className={styles.image1Parent}>
        <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
        <div className={styles.div}>תוכן לילדים סקרנים</div>
        <div className={styles.parent}>
          <b className={styles.b}>מ</b>
          <b className={styles.b1}>
            <span>{`דע `}</span>
            <span className={styles.span}>בקליק</span>
          </b>
        </div>
        <img className={styles.groupChild} alt="" src="/line-1.svg" />
      </div>
      <b className={styles.b2}>תחום</b>
      <b className={styles.b3}>גיל</b>
      <b className={styles.b4}>משך זמן</b>
      <b className={styles.b5}>שפה</b>
      <div className={styles.homePageItem} />
      <div className={styles.image7} />
      <div className={styles.div1}>
        <p className={styles.blankLine}>&nbsp;</p>
        <p
          className={styles.blankLine}
        >{`מוזמנים לצפות איתי בסרטונים מדעיים מרתקים בכל התחומים ולכל הגילאים `}</p>
      </div>
      <div className={styles.div2}>שלום לכל הילדות והילדים</div>
      <div className={styles.hebrewSelection}>
        <div className={styles.hebrew}>Hebrew</div>
      </div>
      <div className={styles.englishSelection}>
        <div className={styles.english}>enGLISH</div>
      </div>
      <img
        className={styles.dashiconsarrowUp}
        alt=""
        src="/dashiconsarrowup.svg"
      />
      <img
        className={styles.dashiconsarrowUp1}
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <img
        className={styles.dashiconsarrowUp2}
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <img
        className={styles.dashiconsarrowUp3}
        alt=""
        src="/dashiconsarrowup1.svg"
      />
      <div className={styles.search}>
        <div className={styles.searchChild} />
        <div className={styles.div3}>{`חיפוש `}</div>
        <img
          className={styles.vaadinglassesIcon}
          alt=""
          src="/vaadinglasses.svg"
        />
      </div>
      <div className={styles.homePageInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.homePageChild1} />
      <div className={styles.homePageChild2} />
      <div className={styles.homePageChild3} />
      <div className={styles.homePageChild4} />
      <div className={styles.homePageChild5} />
      <div className={styles.homePageChild6} />
      <div className={styles.homePageChild7} />
      <div className={styles.groupParent}>
        <div className={styles.group}>
          <div className={styles.div4}>פיזיקה ואסטרונומיה</div>
          <div className={styles.div5}>הכל</div>
          <div className={styles.groupItem} />
          <div className={styles.div6}>מתמטיקה</div>
          <div className={styles.div7}>כימיה</div>
        </div>
        <img className={styles.groupInner} alt="" src="/star-1.svg" />
        <img className={styles.starIcon} alt="" src="/star-2.svg" />
        <img className={styles.groupChild1} alt="" src="/star-3.svg" />
        <img className={styles.groupChild2} alt="" src="/star-2.svg" />
      </div>
    </div>
  );
}
