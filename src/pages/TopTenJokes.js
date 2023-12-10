import { useSelector } from 'react-redux';
import { JokeComponent } from '../components/Joke/JokesComponent';
import styles from '../styles/reusebleStyle.module.scss';
import ErrorRendring from '../components/helpers/Error';
import useUpdate from '../hooks/useUpdate';
import Button, { ShareButton } from '../components/helpers/Button';
import { CoockieLikeStore } from '../components/coockie/Cookie';
import { useMemo, useState } from 'react';
import BedgeSvg from '../components/helpers/Bedge.js';

const TopTenJokes = () => {
  const [like, setLike] = useState();

  const topTenJokes = useSelector((state) => state.jo.topTen);
  const errorState = useSelector((state) => state.jo.error.errorMainArr);

  useMemo(() => {
    let match = document.cookie.match(new RegExp('(^| )like=([^;]+)'));
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
    match = document.cookie.match(new RegExp('(^| )like=([^;]+)'));
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
    match = document.cookie.match(new RegExp('(^| )like=([^;]+)'));
    if (match === null) {
      match = id;
    }
    let arr = [match[2]];
    let newar = arr[0].split(',');
    setLike([...newar, id]);
    CoockieLikeStore(360, [id, match[2]]);
  };

  const index = [];

  const jokeConstructor = topTenJokes.map((el) => {
    let id = el.id;
    index.push(id);
    let findLike = false;
    let findId = false;
    if (like !== undefined) {
      findLike = like.find((el) => el === id);
      findLike = findLike === el.id;
    }

    const arr = index.slice(0, 3);

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
        buttonShare={<ShareButton id={el.id} text={el.text}></ShareButton>}
        bedge={
          arr.includes(el.id) === true && (
            <BedgeSvg place={arr.indexOf(el.id)} />
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
export default TopTenJokes;
