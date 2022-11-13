import styles from './Header.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';

function Buttons() {
  return (
    <div className={styles.buttons}>
      <button type="button" className={styles.logIn}>
        Log In
      </button>
      <button type="button" className="button">
        Sign In
        <img src={arrow} alt="arrow" className={styles.arrow} />
      </button>
    </div>
  );
}

export default Buttons;
