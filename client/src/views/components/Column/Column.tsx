import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { Droppable } from 'react-beautiful-dnd';

function Column(props: { title: string; id: number; tasks: { id: number; task: string }[] }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Droppable droppableId={`${props.id}`}>
      {(provided) => (
        <div className={styles.column}>
          <div className={styles.container}>
            <h4 className={styles.title}>{props.title}</h4>
            <img
              className={styles.image}
              src={deleteImg}
              alt="delete"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className={styles.tasks} ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, index) => (
              <Task key={task.id} id={task.id} task={task.task} index={index} />
            ))}
            {provided.placeholder}
          </div>
          <AddButton title="task" />
          <ConfirmationModal id={'1'} open={openModal} setOpen={setOpenModal} title="Column" />
        </div>
      )}
    </Droppable>
  );
}

export default Column;
