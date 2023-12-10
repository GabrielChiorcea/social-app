import { Fragment } from 'react';
import { FacebookShareButton } from 'react-share';
import styles from '../../styles/reusebleStyle.module.scss';

const Button = (props) => {
  const passId = () => {
    props.onClick(props.id);
  };

  const buttonType = props.type;

  const buttonDefault = (
    <button className={styles.globalButton} onClick={passId}>
      {props.children}
    </button>
  );

  const buttonUp = (
    <svg
      onClick={passId}
      version="1.1"
      fill="rgb(96, 96, 216)"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 32 32"
    >
      <g>
        <path d="M0 16c0 8.837 7.163 16 16 16s16-7.163 16-16-7.163-16-16-16-16 7.163-16 16zM29 16c0 7.18-5.82 13-13 13s-13-5.82-13-13 5.82-13 13-13 13 5.82 13 13z"></path>
        <path d="M22.086 20.914l2.829-2.829-8.914-8.914-8.914 8.914 2.828 2.828 6.086-6.086z"></path>
      </g>
    </svg>
  );

  const buttonDown = (
    <svg
      // className={styles.globalButton}
      onClick={passId}
      fill="rgb(96, 96, 216)"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 32 32"
    >
      <g>
        <path d="M32 16c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zM3 16c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13-13-5.82-13-13z"></path>
        <path d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z"></path>
      </g>
    </svg>
  );

  let button;
  if (buttonType === 'up') {
    button = buttonUp;
  } else if (buttonType === 'down') {
    button = buttonDown;
  } else {
    button = buttonDefault;
  }

  return <Fragment>{button}</Fragment>;
};
export default Button;

export const SendButton = (props) => {
  return (
    <button className={styles.globalButton} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export const ShareButton = (props) => {
  const id = props.id;
  const text = props.text;
  const url = 'https://bancultau.web.app';
  const completUrl = url + '/' + id;

  return (
    <div className={styles.share}>
      <FacebookShareButton url={completUrl} quote={text}>
        <div className={styles.shareElements} style={{ cursor: 'pointer' }}>
          <svg
            version="1.1"
            fill=" rgb(96, 96, 216)"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g>
              <path d="M8 20c0 0 1.838-6 12-6v6l12-8-12-8v6c-8 0-12 4.99-12 10zM22 24h-18v-12h3.934c0.315-0.372 0.654-0.729 1.015-1.068 1.374-1.287 3.018-2.27 4.879-2.932h-13.827v20h26v-8.395l-4 2.667v1.728z"></path>
            </g>
          </svg>
          <span>distribuie</span>
        </div>
      </FacebookShareButton>
    </div>
  );
};
