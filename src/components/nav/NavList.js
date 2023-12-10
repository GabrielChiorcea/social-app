import styles from './NavList.module.scss';
import { NavLink } from 'react-router-dom';


export const NavList = () => {
  return (
    <div className={styles.root}>
      <ul className={styles.ListItems}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M16 1l-16 16 3 3 3-3v13h8v-6h4v6h8v-13l3 3 3-3-16-16zM16 14c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z"></path>
          </svg>
        </NavLink>

        <NavLink
          to="/top-10"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M26 6v-4h-20v4h-6v4c0 3.314 2.686 6 6 6 0.627 0 1.232-0.096 1.801-0.275 1.443 2.063 3.644 3.556 6.199 4.075v6.2h-2c-2.209 0-4 1.791-4 4h16c0-2.209-1.791-4-4-4h-2v-6.2c2.555-0.519 4.756-2.012 6.199-4.075 0.568 0.179 1.173 0.275 1.801 0.275 3.314 0 6-2.686 6-6v-4h-6zM6 13.625c-1.999 0-3.625-1.626-3.625-3.625v-2h3.625v2c0 1.256 0.232 2.457 0.655 3.565-0.213 0.039-0.431 0.060-0.655 0.060zM29.625 10c0 1.999-1.626 3.625-3.625 3.625-0.224 0-0.442-0.021-0.655-0.060 0.423-1.107 0.655-2.309 0.655-3.565v-2h3.625v2z"></path>
          </svg>
        </NavLink>
        <NavLink
          to="/all-posts"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M28 4v26h-21c-1.657 0-3-1.343-3-3s1.343-3 3-3h19v-24h-20c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24v-28h-2z"></path>
            <path d="M7.002 26v0c-0.001 0-0.001 0-0.002 0-0.552 0-1 0.448-1 1s0.448 1 1 1c0.001 0 0.001-0 0.002-0v0h18.997v-2h-18.997z"></path>
          </svg>
        </NavLink>
        <NavLink
          // style={{ fontSize: '28px', width: '33px' }}
          to="/posts"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 34"
          >
            <path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"></path>
            <path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"></path>
          </svg>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
          </svg>
        </NavLink>
      </ul>
    </div>
  );
};
