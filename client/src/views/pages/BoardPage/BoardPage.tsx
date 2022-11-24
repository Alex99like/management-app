import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

function BoardPage() {
  const initialData = {
    tasks: [
      { id: 1, task: 'task1' },
      { id: 2, task: 'task2' },
      { id: 3, task: 'task3' },
      { id: 4, task: 'task4' },
    ],
    columns: [
      { id: 1, title: 'column1', order: [0, 1, 2, 3] },
      { id: 2, title: 'column2', order: [0, 1, 2, 3] },
      { id: 3, title: 'column3', order: [0, 1, 2, 3] },
      { id: 4, title: 'column4', order: [0, 1, 2, 3] },
      { id: 5, title: 'column5', order: [0, 1, 2, 3] },
      { id: 6, title: 'column6', order: [0, 1, 2, 3] },
    ],
    columnOrder: [0, 1, 2, 3, 4, 5],
  };

  const [data, setData] = useState(initialData);

  function dragEndHandler() {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.topPanel}>
        <NavLink to="/main" className={styles.button}>
          <img src={arrow} alt="arrow" className={styles.arrow} />
          Back
        </NavLink>
        <h3>Task title</h3>
      </div>
      <div className={styles.board}>
        <DragDropContext onDragEnd={() => dragEndHandler()}>
          {data &&
            data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.order.map((taskId) => data.tasks[taskId]);

              return <Column key={column.id} id={column.id} title={column.title} tasks={tasks} />;
            })}
        </DragDropContext>
        <div>
          <AddButton title="column" />
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
