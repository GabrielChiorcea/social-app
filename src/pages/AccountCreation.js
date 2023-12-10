import { useRef, useState } from 'react';
import styles from '../components/form/FormInputs.module.scss';
import style from '../styles/reusebleStyle.module.scss';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { authentification, auth } from '../store/firebase-config';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { jokeActions } from '../store/jocke-slice';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(false);
  const [prenume, setPrenume] = useState(false);
  const [email, setEmail] = useState(false);
  const [parola, setParola] = useState(false);

  const nameInput = useRef('');
  const prenumeInput = useRef('');
  const emailInput = useRef('');
  const parolaInput = useRef('');

  const nameHandler = (event) => {
    if (event.target.value) {
      setName(false);
    }
  };
  const prenumeHandler = (event) => {
    if (event.target.value) {
      setPrenume(false);
    }
  };
  const emailHandler = (event) => {
    if (event.target.value) {
      setEmail(false);
    }
  };

  const parolaHandler = (event) => {
    if (event.target.value) {
      setParola(false);
    }
  };
  ///////////////
  const discard = () => {
    navigate(-1);
  };

  const submit = async () => {
    const nameValue = nameInput.current.value;
    const prenumeValue = prenumeInput.current.value;
    const emailValue = emailInput.current.value;
    const parolaValue = parolaInput.current.value;
    const fullName = prenumeInput.current.value + ' ' + nameInput.current.value;

    if (nameValue === '') {
      setName(true);
    }
    if (prenumeValue === '') {
      setPrenume(true);
    }
    if (emailValue === '') {
      setEmail(true);
    }

    if (
      nameValue === '' ||
      prenumeValue === '' ||
      parolaValue === '' ||
      emailValue === ''
    ) {
      return;
    }

    await createUserWithEmailAndPassword(
      authentification,
      emailValue,
      parolaValue
    ).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user) {
        dispatch(jokeActions.welcome({ type: 'creation', name: fullName }));
      }

      updateProfile(auth.currentUser, {
        displayName: nameValue + ' ' + prenumeValue,
      });
      // ...
    });

    navigate(-1);
  };
  //////////

  const inputs = (
    <div className={style.center}>
      <div className={styles.root}>
        <h1 className={style.contTitle}>Creaza cont </h1>
        <svg
          className={style.contSVG}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 32 32"
        >
          <path d="M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 18h14v2h-14zM8 22h14v2h-14zM10 9c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM15 12h-4c-1.65 0-3 0.9-3 2v2h10v-2c0-1.1-1.35-2-3-2z"></path>
        </svg>
        <div className={styles.form}>
          <div className={styles.formInputContainer}>
            <input
              onChange={nameHandler}
              type="text"
              placeholder="Nume"
              ref={nameInput}
              className={
                name === false ? styles.formIntput : styles.formIntputEnpty
              }
            ></input>
            <input
              onChange={prenumeHandler}
              type="text"
              placeholder="Prenume"
              ref={prenumeInput}
              className={
                prenume === false ? styles.formIntput : styles.formIntputEnpty
              }
            ></input>
            <input
              onChange={emailHandler}
              required
              type="email"
              placeholder="Email"
              ref={emailInput}
              className={
                email === false ? styles.formIntput : styles.formIntputEnpty
              }
            ></input>
            <input
              onChange={parolaHandler}
              type="password"
              placeholder="Parola, minim 6 caractere"
              ref={parolaInput}
              className={
                parola === false ? styles.formIntput : styles.formIntputEnpty
              }
            ></input>
          </div>
        </div>
      </div>
      <div className={style.row} style={{ width: '15rem' }}>
        <button className={style.globalButton} onClick={discard}>
          Renunta
        </button>
        <button className={style.globalButton} onClick={submit}>
          Creaza
        </button>
      </div>
    </div>
  );
  return inputs;
};

export default Account;
