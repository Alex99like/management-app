import styles from './Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import { useActions } from '../../../hooks/useAction';

function Button(props: { title: string }) {
  const { callModal } = useActions();
  const { title } = props;

  function handleClick() {
    if (title === 'Sign Up') {
      callModal();
    }
  }

  return (
    <button type="button" className={styles.button}  onClick={handleClick}>
      {title}
      <img src={arrow} alt="arrow" className={styles.arrow} />
    </button>
  );
}

export default Button;
