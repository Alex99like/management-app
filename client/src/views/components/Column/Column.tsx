import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Column(props: {
  title: string;
  id: string;
  index: number;
  tasks: { id: string; task: string }[] | Record<string, never>[];
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? styles.draggable : styles.column}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={styles.container}>
            <h4 className={styles.title} {...provided.dragHandleProps}>
              {props.title}
            </h4>
            <img
              className={styles.image}
              src={deleteImg}
              alt="delete"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <Droppable droppableId={props.id} type="task">
            {(provided) => (
              <div
                className={styles.tasks}
                style={{ minHeight: '50px' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks &&
                  props.tasks.map((task, index) => (
                    <Task key={task.id} id={task.id} task={task.task} index={index} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddButton title="task" />
          <ConfirmationModal id={'1'} open={openModal} setOpen={setOpenModal} title="Column" />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
