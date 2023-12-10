import { useCookies } from 'react-cookie';
import styles from './Cookie.module.scss';
import { Link } from 'react-router-dom';
import { jokeActions } from '../../store/jocke-slice';
import { useDispatch } from 'react-redux';

const Cookie = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(['coockieConsent']);

  const getCookieConsent = () => {
    setCookie('coockieConsent', true, { path: '/' });
    dispatch(jokeActions.cookieConsent(true));
  };

  return (
    <div className={styles.cookieConsent}>
      <p className={styles.text}>
        Buna, folosim cookie, acestea ne ajuta sa ne perfectionam applicatia.
        <Link to={'/confidențialitate-și-politică'}>
          confidențialitate și politică
        </Link>
      </p>
      <button onClick={getCookieConsent} className={styles.cookieButton}>
        OK
      </button>
    </div>
  );
};

export default Cookie;

export const longLiveCoockie = (daysToLive) => {
  const date = new Date();
  const time = date.getTime();
  const expiresTime = time + daysToLive * 24 * 60 * 60 * 1000;
  date.setTime(expiresTime);
  document.cookie =
    'deleteAccount=true; expires=' + date.toUTCString() + 'path/';
};

export const CoockieLikeStore = (daysToLive, id) => {
  const date = new Date();
  const time = date.getTime();
  const expiresTime = time + daysToLive * 24 * 60 * 60 * 1000;
  date.setTime(expiresTime);
  document.cookie = `like= ${[id]}; expires= ${date.toUTCString()} path/`;
};
