import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.flex}>
      <ul className={styles.mn}>
        <li>
          <span className={styles.Hfive}>
            Aplicatie creata de <em>Gabriel Chiorcea</em>
          </span>
        </li>
        <li>
          <span className={styles.Hfive}>Anul primei utilizari 2023</span>
        </li>
        <li>
          <span className={styles.Hfive}>
            Aplicatia este facuta in regim propriu
          </span>
        </li>
        <Link
          className={styles.confidentaliatate}
          to={'/cookie and policies'}
        >
          confidențialitate și politică
        </Link>
      </ul>
      {/* <ul className={styles.uL}>
        <li className={styles.find}>Ne gasesti pe: </li>
        <div className={styles.flexBtn}>
          <button className={styles.btn}>
            <a
              className={styles.directUrl}
              href="https://www.facebook.com/profile.php?id=100090895947016"
            >
              Facebook
            </a>
          </button>
        </div>
      </ul> */}
    </div>
  );
};

export default Footer;
