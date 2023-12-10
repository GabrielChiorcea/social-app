import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styles from './CheckMark.module.scss';
import style from '../../styles/reusebleStyle.module.scss';

const CheckMark = () => {
  const erroMeseger = useSelector((state) => state.jo.error.formError);

  const refresh = () => {
    window.location.reload();
  };

  const isSend = (
    <svg
      className={styles.chekmark}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
    >
      <g>
        <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
      </g>
    </svg>
  );

  const isError = (
    <svg
      className={styles.err}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 32 32"
    >
      <path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM23.304 18.801l0.703 2.399-13.656 4-0.703-2.399zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2z"></path>
    </svg>
  );

  return (
    <>
      <div
        className={
          erroMeseger === false ? styles.chekmarkContainer : styles.styleError
        }
      >
        {erroMeseger === true && isError}

        {erroMeseger === false && isSend}
      </div>

      {erroMeseger === false && (
        <Fragment>
          <button
            className={style.globalButton}
            style={{ width: '10rem' }}
            onClick={refresh}
          >
            inca o postare
          </button>
          <p className={styles.infochemark}>
            Multumim pentru postare. Postarea ta este mai sus, distribuie pe
            facebook sa vada si prietennii tai.
          </p>
        </Fragment>
      )}
      {erroMeseger === true && (
        <p className={styles.infochemark}>Ne pare rau, a aparut o problema</p>
      )}
    </>
  );
};

export default CheckMark;
