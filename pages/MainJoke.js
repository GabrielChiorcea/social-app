import { useSelector } from 'react-redux';
import { JokeComponent } from '../components/Joke/JokesComponent';
import Button, { ShareButton } from '../components/helpers/Button';
import useUpdate from '../hooks/useUpdate';
import styles from '../styles/reusebleStyle.module.scss';
import ErrorRendring from '../components/helpers/Error';
import { Outlet } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { CoockieLikeStore } from '../components/coockie/Cookie';
import BedgeSvg from '../components/helpers/Bedge';

const MainJoke = () => {
  const [like, setLike] = useState();

  const [booleanWords, setBooleanWords] = useState(false);
  const topTenJokes = useSelector((state) => state.jo.topTen);
  const writtenJoke = useSelector((state) => state.jo.writtenJoke);
  const userJoke = useSelector((state) => state.jo.newJoke);
  const errorState = useSelector((state) => state.jo.error.errorMainArr);
  const firstPlace = useMemo(() => topTenJokes.slice(0, 1), [topTenJokes]);
  let switchJoke;

  useMemo(() => {
    let match = document.cookie.match(
      new RegExp('(^| )' + 'like' + '=([^;]+)')
    );
    if (match) {
      let arr = [match[2]];
      let newar = arr[0].split(',');
      setLike(newar);
    } else {
      return;
    }
  }, []);

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
      'fute',
      'penis',
      'sex',
      'sexul',
      'virgina',
      'virgine',
      'curve',
      'zdrente',
      'prostituate',
    ];
    if (userJoke.length !== 0) {
      const splitArr = userJoke.map((element) => {
        return element.text.split(' ');
      });
      const checkWords = ejectWords.map((element) => {
        return splitArr[0].includes(element);
      });
      const findTRUE = checkWords.includes(true);
      setBooleanWords(findTRUE);
    }
  }, [userJoke]);
  // and the clause that filters obscene words end here

  if (writtenJoke) {
    switchJoke = userJoke;
  } else {
    switchJoke = firstPlace;
  }

  const { mapPutVote: update } = useUpdate();
  const increment = (id) => {
    update(id, 'increment', process.env.REACT_APP_URL_BANC);
    let match;
    match = document.cookie.match(new RegExp('(^| )' + 'like' + '=([^;]+)'));
    if (match === null) {
      match = id;
    }
    let arr = [match[2]];
    let newar = arr[0].split(',');
    setLike([...newar, id]);
    CoockieLikeStore(360, [id, match[2]]);
  };
  const decrease = (id) => {
    update(id, 'decrease', process.env.REACT_APP_URL_BANC);
    let match;
    match = document.cookie.match(new RegExp('(^| )' + 'like' + '=([^;]+)'));
    if (match === null) {
      match = id;
    }
    let arr = [match[2]];
    let newar = arr[0].split(',');
    setLike([...newar, id]);
    CoockieLikeStore(360, [id, match[2]]);
  };

  const jokeConstructor = switchJoke.map((el) => {
    let id = el.id;
    let findLike = false;
    let findId = false;
    if (like !== undefined) {
      findLike = like.find((el) => el === id);
      findLike = findLike === el.id;
    }

    return (
      <JokeComponent
        key={el.id}
        name={el.name}
        text={el.text}
        id={el.id}
        photoURL={el.photoURL}
        vote={el.vote}
        buttonDa={
          !writtenJoke &&
          findLike === false &&
          findId === false && (
            <Button id={el.id} onClick={increment} type="up">
              Da
            </Button>
          )
        }
        buttonNu={
          !writtenJoke &&
          findLike === false &&
          findId === false && (
            <Button id={el.id} onClick={decrease} type="down">
              Nu
            </Button>
          )
        }
        buttonShare={
          booleanWords === false && <ShareButton id={el.id} text={el.text} />
        }
        bedge={!writtenJoke && <BedgeSvg />}
      />
    );
  });

  return (
    <div className={styles.center}>
      {!errorState && jokeConstructor}
      {errorState && <ErrorRendring />}
      <Outlet />
    </div>
  );
};

export default MainJoke;
