import { auth } from '../store/firebase-config';
import { signOut } from 'firebase/auth';
import Form from '../components/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { JokeComponent } from '../components/Joke/JokesComponent';
import { ShareButton } from '../components/helpers/Button';
import Login from '../components/LogingWays/Login';
import { useEffect, useState, useMemo } from 'react';
import styles from '../styles/reusebleStyle.module.scss';
import { jokeActions } from '../store/jocke-slice';
import { longLiveCoockie } from '../components/coockie/Cookie';
import Wellcome from '../components/wellcome/Wellcome';

const User = () => {
  const [joke, setJoke] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [user, setUser] = useState(false);
  const [errorState, setErrorState] = useState('');
  const dispatch = useDispatch();
  const jokesArray = useSelector((state) => state.jo.jokes);
  const jokesArrayMajor = useSelector((state) => state.jo.banc);
  const existUser = useSelector((state) => state.jo.existUser);
  const newJoke = useSelector((state) => state.jo.newJoke);
  const deleteUserAccount = useSelector((state) => state.jo.deleteAccount);
  const writtenJoke = useSelector((state) => state.jo.writtenJoke);
  const [booleanWords, setBooleanWords] = useState(false);
  const [ifSpin, setIfSpin] = useState(false);
  const wellcome = useSelector((state) => state.jo.wellcomeState);
  const [sett, setSett] = useState(false);
  const [wellcomeMes, setWellcomeMes] = useState(false);

  useEffect(() => {
    if (existUser === false) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, [existUser]);

  useEffect(() => {
    if (auth.currentUser === null) {
      setJoke(null);
    } else {
      const arr = [...jokesArrayMajor, ...jokesArray];
      const findJokes = arr.filter((el) => el.idUser === auth.currentUser.uid);
      if (findJokes.length === 0) {
        setJoke(null);
      } else {
        setJoke(findJokes);
      }
      setCurrentUser(auth.currentUser.uid);
    }
  }, [jokesArray, jokesArrayMajor]);

  useEffect(() => {
    let timer;
    if (wellcome === 'empty') {
      return;
    } else {
      timer = setInterval(() => {
        setWellcomeMes(true);
        sessionStorage.setItem('wellcome', 'true');
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [wellcome]);

  let wellcomeSession = false;

  if (sessionStorage.getItem('wellcome') !== null) {
    wellcomeSession = true;
  }

  const submitOut = async () => {
    await signOut(auth).then(() => {
      sessionStorage.removeItem('wellcome');
    });

    window.location.reload();
  };

  const spin = () => {
    setIfSpin(!ifSpin);
  };
  // starting from here the state that clause that filters obscene words
  useMemo(() => {
    const ejectWords = [
      'muie',
      'pula',
      'pizda',
      'coaie',
      'sugi',
      'morti',
      'mati',
      'crucea',
      'fut',
      'futi',
      'belesti',
      'sugio',
      'sugi-o',
    ];
    if (newJoke.length !== 0) {
      const splitArr = newJoke.map((element) => {
        return element.text.split(' ');
      });
      const checkWords = ejectWords.map((element) => {
        return splitArr[0].includes(element);
      });
      const findTRUE = checkWords.includes(true);
      setBooleanWords(findTRUE);
    }
  }, [newJoke]);
  // and the clause that filters obscene words end here

  let newJokeConstructor;
  if (newJoke && existUser === true) {
    newJokeConstructor = newJoke.map((el) => (
      <JokeComponent
        key={el.id}
        name={el.name}
        prenume={el.prenume}
        text={el.text}
        photoURL={el.photoURL}
        id={el.id}
        vote={el.vote}
        buttonShare={
          booleanWords === false && (
            <ShareButton id={el.id} text={el.text}></ShareButton>
          )
        }
      />
    ));
  }

  let jokeConstructor;
  if (user === true && joke !== null) {
    jokeConstructor = joke.map((el) => (
      <JokeComponent
        key={el.id}
        name={el.name}
        prenume={el.prenume}
        text={el.text}
        photoURL={el.photoURL}
        id={el.id}
        vote={el.vote}
        buttonShare={<ShareButton id={el.id} text={el.text}></ShareButton>}
      />
    ));
  } else if (user === true && joke === null) {
    jokeConstructor = (
      <div className={styles.center}>
        {joke === null && !writtenJoke && (
          <h1 className={styles.contTitle}>
            <em>Nu ai postari</em>
          </h1>
        )}
        {joke ? newJokeConstructor : <Form />}
      </div>
    );
  } else {
    jokeConstructor = <Login />;
  }

  const deleteCurrentUser = () => {
    fetch(process.env.REACT_APP_DeleteAccountRequest, {
      method: 'POST',
      body: JSON.stringify({ userId: currentUser }),
    }).catch((err) => setErrorState(!!err));
    dispatch(jokeActions.checkUser(false));
    setJoke(null);
    setUser(false);
    longLiveCoockie(0.1);
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
  };

  const settingHandler = () => {
    setSett(!sett);
  };

  return (
    <div>
      {wellcomeMes === false && wellcomeSession === false && <Wellcome />}
      <div className={styles.optionContainer}>
        {user && !deleteUserAccount && (
          <button
            onClick={spin}
            className={`${styles.gearSVGcontainer} ${
              ifSpin && styles.gearSpinRight
            }`}
          >
            <svg
              onClick={settingHandler}
              className={styles.gearSVG}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 32 32"
            >
              <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
            </svg>
          </button>
        )}

        {user && !deleteUserAccount && sett === true && (
          <div className={`${styles.row} ${ifSpin && styles.slideRight}`}>
            <button onClick={deleteCurrentUser} className={styles.globalButton}>
              Sterge cont
            </button>
            <button onClick={submitOut} className={styles.globalButton}>
              Deconectare
            </button>
          </div>
        )}
      </div>
      <div className={styles.center}>
        {deleteUserAccount && <h1 className={styles.text}>Mesaj de la noi</h1>}

        {!errorState && deleteUserAccount && (
          <p className={styles.text}>
            Multumim pentru activatate, noi am primit cererea de stregere a
            contului si o vom procesa, imediat ce am sters o sa primiti un email
            de confirmare! Poate sa dureze un timp, pana atunci puteti sa mai
            navigati prin aplicatie.
          </p>
        )}
        {deleteUserAccount && errorState && (
          <p className={styles.text}>
            Hmm, avem o eroare, trebuie sa verificam, ne puteti scrie in privat
            pe facebook sau la adresa de email gabrielchiorcea@gmail.com.
          </p>
        )}
        {newJoke.length !== 0 && newJokeConstructor}
        {deleteUserAccount === false && jokeConstructor}
      </div>
    </div>
  );
};

export default User;
