import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
      <p className={styles.text}>Завантаження нотатків...</p>
    </div>
  );
};

export default Loading;
