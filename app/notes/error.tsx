'use client';

import styles from './error.module.css';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>❌Помилка при завантаженні</h2>
      <p>{error.message}</p>
      <button onClick={reset} className={styles.button}>
        Спробувати знову
      </button>
    </div>
  );
};

export default Error;
//.............................................................
