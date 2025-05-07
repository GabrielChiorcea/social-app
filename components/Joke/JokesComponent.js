import styles from './JokesComponent.module.scss';
import imgLogo from '../../asstes/imgLogo.jpg';


export const JokeComponent = (props) => {
  let img = <img src={imgLogo} className={styles.CompetitorProfile} alt="" />;


  if (props.photoURL !== undefined) {
    img = (
      <img src={props.photoURL} className={styles.CompetitorProfile} alt="" />
    );
  }
  
  return (
    <div className={styles.JokeComponentContainer}>
      <div className={styles.bedge}>{props.bedge}</div>
      <div className={styles.root}>
        <div className={styles.competiorContainer}>
          <div className={styles.competiorContainerProfile} >
          {img}
          </div>
          <p>{props.name}</p>
        </div>
        <p className={styles.jokeText}>{props.text}</p>
        <div className={styles.voteContainer}>
          <p>Merita acesta postare un vot? </p>
          <p>Postarea are {props.vote} voturi</p>
          <div className={styles.buttons}>
            {props.buttonDa}
            {props.buttonNu}
            {props.buttonShare}
          </div>
        </div>
      </div>
    </div>
  );
};
