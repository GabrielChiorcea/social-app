import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { authentification } from '../../store/firebase-config';
import styles from './FaceBookLogin.module.scss';
import { useState } from 'react';

const FaceBookLoginButton = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const login = async () => {
    const provider = new FacebookAuthProvider();
    // await signInWithPopup(authentification, provider);
    signInWithPopup(authentification, provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // fetch facebook graph api to get user actual profile picture
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            setProfilePicture(URL.createObjectURL(blob));
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={styles.facebookContainer}
      onClick={login}
      style={{ backgroundColor: '#1877F2' }}
    >
      <svg
        className={styles.facebookIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48px"
        height="48px"
      >
        <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z" />
      </svg>
      <span className={styles.conecteazate}>
        <span>Continua cu facebook</span>
      </span>
    </div>
  );
};

export default FaceBookLoginButton;
