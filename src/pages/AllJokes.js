import { JokeComponent } from '../components/Joke/JokesComponent';
import Button, { ShareButton } from '../components/helpers/Button';
import useUpdate from '../hooks/useUpdate';
import ErrorRendring from '../components/helpers/Error';
import { useSelector } from 'react-redux';
import styles from '../styles/reusebleStyle.module.scss';
import { CoockieLikeStore } from '../components/coockie/Cookie';
import { useMemo, useState } from 'react';

const AllJokes = () => {
  const [like, setLike] = useState();
  // const [shuffled, setShuffled] = useState([]);
  const jokesArray = useSelector((state) => state.jo.jokes);
  const errorState = useSelector((state) => state.jo.error.errorMainArr);

  // let shuffledArray = [...jokesArray].sort(() => Math.random() - 0.5);
  // useMemo(() => {
  //   setShuffled(shuffledArray);
  // }, [jokesArray]);

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
    let match;
    match = document.cookie.match(new RegExp('(^| )' + 'like' + '=([^;]+)'));
    if (match === null) {
      match = id;
    }
    let arr = [match[2]];
    let newar = arr[0].split(',');
    setLike([...newar, id]);
    CoockieLikeStore(360, [id, match[2]]);
    update(id, 'decrease', process.env.REACT_APP_URL_BANC);
  };

  const jokeConstructor = jokesArray.map((el) => {
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
        id={el.id}
        photoURL={el.photoURL}
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
        buttonShare={<ShareButton id={el.id} text={el.text} />}
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
export default AllJokes;
