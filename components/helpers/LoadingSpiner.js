import styles from '../../styles/reusebleStyle.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinerCenter}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
