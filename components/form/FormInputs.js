import { auth } from '../../store/firebase-config';
import { useEffect, useRef, useState } from 'react';
import { SendButton } from '../helpers/Button';
import { jokeActions } from '../../store/jocke-slice';
import { useDispatch, useSelector } from 'react-redux';
import { LoginButtons } from '../LogingWays/Login';
import styles from './FormInputs.module.scss';
import nextId from 'react-id-generator';

const FormInputs = () => {
  const existUser = useSelector((state) => state.jo.existUser);
  const dispatch = useDispatch();

  const [joke, setJoke] = useState('');
  const [banc, setBanc] = useState('');
  // const [name, setName] = useState(false);
  // const [prenume, setPrenume] = useState(false);
  // const [email, setEmail] = useState(false);

  const textInput = useRef('');
  // const nameInput = useRef('');
  // const prenumeInput = useRef('');
  // const emailInput = useRef('');

  // const nameHandler = (event) => {
  //   if (event.target.value) {
  //     setName(false);
  //   }
  // };
  // const prenumeHandler = (event) => {
  //   if (event.target.value) {
  //     setPrenume(false);
  //   }
  // };
  // const emailHandler = (event) => {
  //   if (event.target.value) {
  //     setEmail(false);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    const textValue = textInput.current.value;
    // const nameValue = nameInput.current.value;
    // const prenumeValue = prenumeInput.current.value;
    // const emailValue = emailInput.current.value;

    const inputsObj = {
      text: textValue,
      vote: '0',
    };

    const user = auth.currentUser;
    let obj;
    if (user !== null) {
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const uid = user.uid;
      const addres = user.email;

      obj = {
        name: displayName,
        photoURL: photoURL,
        id: uid,
        email: addres,
      };
    }
    // else {
    //   obj = {
    //     name: nameValue + ' ' + prenumeValue,
    //     email: emailValue,
    //   };
    // }
    // setEmail(emailValue);
    // setName(nameValue);
    // setPrenume(prenumeValue);
    setJoke({ ...inputsObj, ...obj });
  };

  let url;
  if (banc === 'da') {
    url = process.env.REACT_APP_URL_MAJOR;
  } else {
    url = process.env.REACT_APP_URL_BANC;
  }

  const setDa = () => {
    setBanc('da');
  };

  useEffect(() => {
    if (joke.text === '' || joke === undefined || joke === '') {
      return;
    } else {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(joke),
      }).catch((err) =>
        dispatch(
          jokeActions.setError({
            errorMainArr: false,
            errorMajorArr: false,
            formError: !!err,
          })
        )
      );
    }
  }, [dispatch, url, joke]);

  useEffect(() => {
    if (joke.text === '' || joke === undefined || joke === '') {
      return;
    } else {
      const id = nextId();
      dispatch(jokeActions.setBoolean(true));
      dispatch(jokeActions.addNewJoke({ ...joke, id }));
    }
  }, [dispatch, joke]);

  // const inputs = (
  //   <div className={styles.formInputContainer}>
  //     <input
  //       onChange={nameHandler}
  //       type="text"
  //       placeholder="Nume"
  //       ref={nameInput}
  //       className={name === false ? styles.formIntput : styles.formIntputEnpty}
  //     ></input>
  //     <input
  //       onChange={prenumeHandler}
  //       type="text"
  //       placeholder="Prenume"
  //       ref={prenumeInput}
  //       className={
  //         prenume === false ? styles.formIntput : styles.formIntputEnpty
  //       }
  //     ></input>
  //     <input
  //       onChange={emailHandler}
  //       required
  //       type="email"
  //       placeholder="Email"
  //       ref={emailInput}
  //       className={email === false ? styles.formIntput : styles.formIntputEnpty}
  //     ></input>
  //   </div>
  // );

  const element = (
    <LoginButtons />
    // <div className={styles.Hfour}>
    //   <span className={styles.text}>
    //     Sau va puteti conecta cu facebook pentru a avea profilul personalizat si
    //     sa urmaresti bancurile tale
    //   </span>
    //   <div className={styles.goToFacebook}>
    //     <span>
    //       <em>Poti sa te conectezi cu facebook</em>
    //     </span>
    //     <LoginButton />
    //   </div>
    // </div>
  );

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={submitHandler}>
        <textarea
          required
          placeholder="Scrie postarea aici..."
          className={styles.textForm}
          ref={textInput}
        />

        {existUser !== false && (
          <>
            <div className={styles.Hfour}>
              <h4>Postarea contine cuvinte obscene?</h4>
            </div>
            <div className={styles.centerRow}>
              <SendButton key="B1" onClick={setDa}>
                Da
              </SendButton>
              <SendButton key="B2">Nu</SendButton>
            </div>
          </>
        )}

        {existUser === false && element}
      </form>
    </div>
  );
};

export default FormInputs;
