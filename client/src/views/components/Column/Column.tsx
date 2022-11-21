import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';
import { DragEvent, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Column(props: { title: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<null | { title: string }>(null);

  function dragStartHandler(e: DragEvent<HTMLDivElement>, column: { title: string }) {
    console.log('drag', column);
    setCurrentColumn(column);
  }

  function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.background = 'white';
  }

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.currentTarget.style.background = 'grey'; //стили надо будет поменять
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, column: { title: string }) {
    e.preventDefault();
    console.log('drop', column);
    e.currentTarget.style.background = 'white';
  }

  return (
    <div
      className={styles.column}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, props)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDrop={(e) => dropHandler(e, props)}
    >
      <div className={styles.container}>
        <h4 className={styles.title}>{props.title}</h4>
        <img
          className={styles.image}
          src={deleteImg}
          alt="delete"
          onClick={() => setOpenModal(true)}
        />
      </div>
      <div className={styles.tasks}>
        <Task task="task1" />
        <Task task="task2" />
        <Task task="task3" />
        <Task task="task4" />
      </div>
      <AddButton title="task" />
      <ConfirmationModal id={'1'} open={openModal} setOpen={setOpenModal} title="Column" />
    </div>
  );
}

export default Column;
