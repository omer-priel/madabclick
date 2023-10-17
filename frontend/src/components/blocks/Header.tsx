import styles from "@/styles/styles.module.css";

export default function Header() {

  return (
    <>
      <div className={styles.hebrewSelection}>
        <div className={styles.hebrew}>Hebrew</div>
      </div>
      <div className={styles.englishSelection}>
        <div className={styles.english}>enGLISH</div>
      </div>
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
    </>
  );
}
