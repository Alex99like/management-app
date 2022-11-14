import styles from './Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';

function Button(props: { title: string }) {
  return (
    <button type="button" className={styles.button}>
      {props.title}
      <img src={arrow} alt="arrow" className={styles.arrow} />
    </button>
  );
}

export default Button;
