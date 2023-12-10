import FaceBookLoginButton from './FaceBookLogin';
import EmailPassButton from './EmailPass';
import styles from './Login.module.scss';

export const LoginButtons = () => {
  return (
    <div className={styles.loginContainer}>
      <span className={styles.text}>
        Pentru a putea scrie o postare trebuie sa va conectati sau sa creati un
        cont.
      </span>
      <span className={styles.FacebookText}>Poti sa folosesti</span>
      <EmailPassButton />
      <span className={styles.option}>sau</span>
      <FaceBookLoginButton />
    </div>
  );
};

const Login = () => {
  return (
    <div className={styles.userContainer}>
      <svg
        className={styles.plug}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="280"
        viewBox="0 0 32 32"
      >
        <path d="M32 8.828l-2.828-2.828-5.586 5.586-3.172-3.172 5.586-5.586-2.828-2.828-5.586 5.586-3.586-3.586-2.707 2.707 16 16 2.707-2.707-3.586-3.586 5.586-5.586z"></path>
        <path d="M24.814 21.056l-13.87-13.87c-2.994 3.591-6.391 9.139-4.044 13.913l-4.133 4.133c-0.972 0.972-0.972 2.563 0 3.535l0.464 0.464c0.972 0.972 2.563 0.972 3.536 0l4.133-4.133c4.774 2.348 10.322-1.049 13.913-4.043z"></path>
      </svg>
      <h1 className={styles.title}>Nu sunteti conectat!</h1>
      {<LoginButtons />}
    </div>
  );
};

export default Login;
