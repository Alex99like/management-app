import styles from './Task.module.scss';
import dotsImg from '../../../assets/icons/dots.svg';
import { Draggable } from 'react-beautiful-dnd';

function Task(props: { task: string; id: number; index: number }) {
  return (
    <Draggable draggableId={`${props.id}`} index={props.index}>
      {(provided) => (
        <div
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{props.task}</p>
          <img className={styles.image} src={dotsImg} alt="edit" />
        </div>
      )}
    </Draggable>
  );
}

export default Task;
