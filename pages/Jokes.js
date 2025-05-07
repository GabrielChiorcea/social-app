import { JokeComponent } from '../components/Joke/JokesComponent';
import styles from '../styles/reusebleStyle.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useUpdate from '../hooks/useUpdate';
import Button from '../components/helpers/Button';
import { FetchDataBase } from '../store/joke-actions';
import ErrorRendring from '../components/helpers/Error';
import { useEffect, useMemo, useState } from 'react';
import { CoockieLikeStore } from '../components/coockie/Cookie';

const JokePlus = () => {
  const [like, setLike] = useState();

  const plusJokes = useSelector((state) => state.jo.banc);
  const errorState = useSelector((state) => state.jo.error.errorMajorArr);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDataBase(process.env.REACT_APP_URL_MAJOR));
  }, [dispatch]);

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

  const { mapPutVote: update } = useUpdate();

  const increment = (id) => {
    update(id, 'increment', process.env.REACT_APP_URL_MAJOR);
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
    update(id, 'decrease', process.env.REACT_APP_URL_MAJOR);
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

  const jokeConstructor = plusJokes.map((el) => {
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
        prenume={el.prenume}
        text={el.text}
        photoURL={el.photoURL}
        id={el.id}
        vote={el.vote}
        buttonDa={
          findLike === false &&
          findId === false && (
            <Button id={el.id} onClick={increment} type="up">
              Da
            </Button>
          )
        }
        buttonNu={
          findLike === false &&
          findId === false && (
            <Button id={el.id} onClick={decrease} type="down">
              Nu
            </Button>
          )
        }
      />
    );
  });

  return (
    <div className={styles.center}>
      {!errorState && jokeConstructor}
      {errorState && <ErrorRendring />}
    </div>
  );
};

export default JokePlus;
