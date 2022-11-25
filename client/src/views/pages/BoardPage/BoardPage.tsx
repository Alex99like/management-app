import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { removeNode } from '../../../utils/removeNode';

function BoardPage() {
  const initialData = {
    tasks: [
      { id: '0', task: 'task1' },
      { id: '1', task: 'task2' },
      { id: '2', task: 'task3' },
      { id: '3', task: 'task4' },
    ],
    columns: [
      { id: '0', title: 'column1', order: [0, 1, 2, 3] },
      { id: '1', title: 'column2', order: [] },
      { id: '2', title: 'column3', order: [] },
      { id: '3', title: 'column4', order: [] },
      { id: '4', title: 'column5', order: [] },
      { id: '5', title: 'column6', order: [] },
    ],
    columnOrder: [0, 1, 2, 3, 4, 5],
  };

  const [data, setData] = useState(initialData);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = data.columns[Number(source.droppableId)];
    const finish = data.columns[Number(destination.droppableId)];
    console.log(finish);

    if (start === finish) {
      const newTaskOrder = Array.from(start.order);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, Number(draggableId));
      const newColumn = { ...start, order: newTaskOrder };
      const columnsArr = data.columns;

      const changedColumns = removeNode(columnsArr, Number(newColumn.id), newColumn);

      const newState = {
        ...data,
        columns: changedColumns,
      };
      setData(newState);
      return;
    } else {
      const startTaskOrder = Array.from(start.order);
      startTaskOrder.splice(source.index, 1);
      const newStart = {
        ...start,
        order: startTaskOrder,
      };

      const finishTaskOrder = Array.from(finish.order);
      finishTaskOrder.splice(destination.index, 0, Number(draggableId));
      const newFinish = {
        ...finish,
        order: finishTaskOrder,
      };

      const columnsArr = data.columns;
      const changedStartColumns = removeNode(columnsArr, Number(newStart.id), newStart);
      const changedFinishColumns = removeNode(changedStartColumns, Number(newFinish.id), newFinish);

      const newState = {
        ...data,
        columns: changedFinishColumns,
      };
      console.log(newState);
      setData(newState);
    }
  };

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
        <DragDropContext onDragEnd={dragEndHandler}>
          {data &&
            data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.order ? column.order.map((taskId) => data.tasks[taskId]) : [];

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
