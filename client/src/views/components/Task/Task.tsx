import styles from './Task.module.scss';
import closeImg from '../../../assets/icons/close-button.svg';
import dotsImg from '../../../assets/icons/dots.svg';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { Draggable } from 'react-beautiful-dnd';

function Task(props: { task: string; columnsId: string; id: string; index: number }) {
  const { task, columnsId, id } = props;
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Draggable draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDragging ? styles.draggable : styles.task}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{task}</p>
            <img
              className={styles.image}
              src={dotsImg}
              alt="edit"
              onClick={() => setOpenModal(true)}
            />
            <img
              className={styles.image}
              src={closeImg}
              alt="close"
              onClick={() => setOpenModal(true)}
            />
          </div>
        )}
      </Draggable>
      <ConfirmationModal
        id={id}
        open={openModal}
        setOpen={setOpenModal}
        title="Task"
        columnsId={columnsId}
      />
    </>
  );
}

export default Task;
