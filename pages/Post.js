import { JokeComponent } from '../components/Joke/JokesComponent';
import { useSelector } from 'react-redux';
import styles from '../styles/reusebleStyle.module.scss';
import { ShareButton } from '../components/helpers/Button';
import { useLocation } from 'react-router';

const Post = () => {
  const id = useLocation();
  const filterBy = id.pathname.split('/').join('');
  const jokesArray = useSelector((state) => state.jo.jokes);

  const filter = jokesArray.filter((el) => el.id === filterBy);

  const jokeConstructor = filter.map((el) => (
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

  return <div className={styles.center}>{jokeConstructor}</div>;
};

export default Post;
