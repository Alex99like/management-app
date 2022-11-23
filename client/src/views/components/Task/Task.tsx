import styles from './Task.module.scss';
import dotsImg from '../../../assets/icons/dots.svg';
import { DragEvent, useState } from 'react';

function Task(props: { task: string }) {
  const [currentTask, setCurrentTask] = useState<null | { task: string }>(null);

  function dragStartHandler(e: DragEvent<HTMLDivElement>, task: { task: string }) {
    console.log('drag', task);
    setCurrentTask(task);
  }

  function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.background = 'white';
  }

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.currentTarget.style.background = 'grey'; //стили надо будет поменять
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, task: { task: string }) {
    e.preventDefault();
    console.log('drop', task);
    e.currentTarget.style.background = 'white';
  }

  return (
    <div
      className={styles.task}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, props)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDrop={(e) => dropHandler(e, props)}
    >
      <p>{props.task}</p>
      <img className={styles.image} src={dotsImg} alt="edit" />
    </div>
  );
}

export default Task;
