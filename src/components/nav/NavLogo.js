import styles from './NavLogo.module.scss';
import imgLogo from '../../asstes/imgLogo.jpg';

export const NavLogo = () => {
  return (
    <div className={styles.root}>
      <img src={imgLogo} className={styles.imgLogo} alt="Bancuri si glume" />
      {/* <span className={styles.textLogo}>Bancu</span> */}
    </div>
  );
};
