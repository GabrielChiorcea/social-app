import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentification } from '../store/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { jokeActions } from '../store/jocke-slice';
import { useNavigate } from 'react-router';
import styles from '../components/form/FormInputs.module.scss';
import style from '../styles/reusebleStyle.module.scss';

const SingIn = () => {
  const regsitationError = useSelector((state) => state.jo.error.registration);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInput = useRef('');
  const parolaInput = useRef('');

  const discard = () => {
    navigate(-1);
  };

  /////////
  const submit = async () => {
    const emailValue = emailInput.current.value;
    const parolaValue = parolaInput.current.value;
    let err = false;
    await signInWithEmailAndPassword(authentification, emailValue, parolaValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (user) {
          dispatch(jokeActions.welcome('registration'));
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (!!errorCode === true) {
          err = true;
        }
      });
    dispatch(
      jokeActions.setError({
        errorMainArr: false,
        errorMajorArr: false,
        formError: false,
        registration: true,
      })
    );
    if (err === false) {
      navigate(-1);
    }
  };

  //////

  const inputs = (
    <div className={style.center}>
      <div className={styles.root}>
        <h1 className={style.contTitle}>Conecteazate</h1>
        <svg
          className={style.contSVG}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 35 32"
        >
          <path d="M28 8v-4h-28v22c0 1.105 0.895 2 2 2h27c1.657 0 3-1.343 3-3v-17h-4zM26 26h-24v-20h24v20zM4 10h20v2h-20zM16 14h8v2h-8zM16 18h8v2h-8zM16 22h6v2h-6zM4 14h10v10h-10z"></path>
        </svg>
        {regsitationError === true && (
          <span style={{ color: 'red' }}>
            <em>Parola sau email-ul gresit!</em>
          </span>
        )}

        <div className={styles.form}>
          <div className={styles.formInputContainer}>
            <input
              required
              type="email"
              placeholder="Email"
              ref={emailInput}
              className={styles.formIntput}
            ></input>
            <input
              type="password"
              placeholder="Parola"
              ref={parolaInput}
              className={styles.formIntput}
            ></input>
          </div>
        </div>
      </div>
      <div className={style.row} style={{ width: '15rem' }}>
        <button className={style.globalButton} onClick={discard}>
          Renunta
        </button>
        <button className={style.globalButton} onClick={submit}>
          Conectare
        </button>
      </div>
    </div>
  );
  return inputs;
};

export default SingIn;
