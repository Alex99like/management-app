import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';

function Column(props: { title: string }) {
  return (
    <div className={styles.column}>
      <div className={styles.container}>
        <h4 className={styles.title}>{props.title}</h4>
        <img className={styles.image} src={deleteImg} alt="delete" />
      </div>
      <div className={styles.tasks}>
        <Task task="task1" />
        <Task task="task2" />
        <Task task="task3" />
        <Task task="task4" />
      </div>
      <AddButton title="task" />
    </div>
  );
}

export default Column;
