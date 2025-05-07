import { Fragment, useEffect, useState, useMemo } from 'react';
import { auth } from '../store/firebase-config';
import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav/Nav';
import OnLineCheck from '../components/onlineCheck/OnLineChek';
import { onAuthStateChanged } from 'firebase/auth';
import { jokeActions } from '../store/jocke-slice';
import { useDispatch } from 'react-redux';

const RoutesLayout = () => {
  const dispatch = useDispatch();
  const [isOffLine, setIsOffLine] = useState(window.navigator.onLine);

  useEffect(() => {
    let coock = document.cookie
      .split(';')
      .map((el) => el.split('='))
      .reduce(
        (acumulator, [key, value]) => ({
          ...acumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );
    if (coock.deleteAccount !== undefined) {
      dispatch(jokeActions.deleteAccount(true));
    }
  }, [dispatch]);

  useMemo(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(jokeActions.checkUser(true));
      }
    });
  }, [dispatch]);

  const handleStatusChange = () => {
    setIsOffLine(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
  }, []);

  return (
    <Fragment>
      {isOffLine && (
        <>
          <Nav />
          <Outlet />
        </>
      )}
      {!isOffLine && <OnLineCheck />}
    </Fragment>
  );
};

export default RoutesLayout;
