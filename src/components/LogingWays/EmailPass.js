import styles from '././EmailPass.module.scss';
import style from '../../styles/reusebleStyle.module.scss';
import { NavLink } from 'react-router-dom';

const EmailPassButton = () => {
  return (
    <div className={styles.EmailPassButton}>
      <div className={styles.marginRight}>
        <NavLink to="/profile/create-account" className={styles.NavLink}>
          <span className={styles.cont}>creare</span>
        </NavLink>
      </div>
      <div className={styles.marginRight} style={{ borderRight: 'none' }}>
        <NavLink to="/profile/conect" className={styles.NavLink}>
          <span className={styles.cont}>conectare</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmailPassButton;
