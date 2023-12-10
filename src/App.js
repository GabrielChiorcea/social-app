import React, { useEffect, Fragment } from 'react';
import LoadingSpinner from './components/helpers/LoadingSpiner';
import { FetchDataBase } from './store/joke-actions';
import { useDispatch } from 'react-redux';
import { SetTopTen } from './store/joke-actions';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Cookie from './components/coockie/Cookie';
import { useCookies } from 'react-cookie';
// import { logEvent } from 'firebase/analytics';
// import { analytics } from './store/firebase-config';

function App() {
  const [coockie] = useCookies(['coockieConsent']);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (coockie.coockieConsent === 'true') {
  //     logEvent(analytics, 'notification_received');
  //   }
  // }, [coockie]);

  useEffect(() => {
    dispatch(FetchDataBase(process.env.REACT_APP_URL_BANC));
  }, [dispatch]);

  SetTopTen();

  return (
    <div>
      <main>
        <React.Suspense
          fallback={
            <Fragment>
              <LoadingSpinner></LoadingSpinner>
            </Fragment>
          }
        >
          {!coockie.coockieConsent && <Cookie />}
          <Outlet />
        </React.Suspense>
        <Footer />
      </main>
    </div>
  );
}

export default App;
