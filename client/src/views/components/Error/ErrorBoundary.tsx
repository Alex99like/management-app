import { useNavigate } from 'react-router-dom';
import styles from './ErrorElement.module.scss';

export const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ops, what went wrong !!!</h1>
      <div className={styles.containerChoice}>
        <div className={styles.btnContainer}>
          <p className={styles.description}>You can try again</p>
          <button className={styles.btn} onClick={() => window.location.reload()}>
            Go Back
          </button>
        </div>
        <h2 className={styles.or}>OR</h2>
        <div className={styles.btnContainer}>
          <p className={styles.description}>You can return to the main page</p>
          <button className={styles.btn} onClick={() => location.replace('/')}>
            Go Welcome
          </button>
        </div>
      </div>
    </div>
  );
};
