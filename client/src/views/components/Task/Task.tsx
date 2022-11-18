import styles from './Task.module.scss';
import dotsImg from '../../../assets/icons/dots.svg';

function Task(props: { task: string }) {
  return (
    <div className={styles.task}>
      <p>{props.task}</p>
      <img className={styles.image} src={dotsImg} alt="delete" />
    </div>
  );
}

export default Task;
