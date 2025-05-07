import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.flex}>
          <h3 className={styles.Hfive}>
            Aplicatie creata de <em>Gabriel Chiorcea</em>
          </h3>
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
