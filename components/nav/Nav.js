import { NavLogo } from './NavLogo';
import { NavList } from './NavList';
import styles from './Nav.module.scss';

export const Nav = () => {
  return (
    <div className={styles.root}>
      <NavLogo></NavLogo>
      <NavList />
    </div>
  );
};

export default Nav;
