import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDR8598KueVD4swIlzqTqulDiHOSbmIps0',
  authDomain: 'bancultau.firebaseapp.com',
  databaseURL:
    'https://bancultau-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bancultau',
  storageBucket: 'bancultau.appspot.com',
  messagingSenderId: '679853883473',
  appId: '1:679853883473:web:43a823918000c052153870',
  measurementId: 'G-66MY05WDYX',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const authentification = getAuth(app);

export const analytics = getAnalytics(app);
