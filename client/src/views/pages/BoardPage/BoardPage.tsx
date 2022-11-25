import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

function BoardPage() {
  const initialData = {
    tasks: {
      task1: { id: 'task1', task: 'task1' },
      task2: { id: 'task2', task: 'task2' },
      task3: { id: 'task3', task: 'task3' },
      task4: { id: 'task4', task: 'task4' },
    },
    columns: {
      column1: { id: 'column1', title: 'column1', order: ['task1', 'task2', 'task3', 'task4'] },
      column2: { id: 'column2', title: 'column2', order: [] },
      column3: { id: 'column3', title: 'column3', order: [] },
      column4: { id: 'column4', title: 'column4', order: [] },
      column5: { id: 'column5', title: 'column5', order: [] },
      column6: { id: 'column6', title: 'column6', order: [] },
    },
    columnOrder: ['column1', 'column2', 'column3', 'column4', 'column5', 'column6'],
  };

  const [data, setData] = useState(initialData);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }
    const start = data.columns[source.droppableId as keyof typeof data.columns];
    const finish = data.columns[destination.droppableId as keyof typeof data.columns];

    if (start === finish) {
      const newTaskOrder = Array.from(start.order);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        order: newTaskOrder,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
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
      finishTaskOrder.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        order: finishTaskOrder,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
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
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="all" direction="horizontal" type="column">
          {(provided) => (
            <div className={styles.board} {...provided.droppableProps} ref={provided.innerRef}>
              {data &&
                data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId as keyof typeof data.columns];
                  const tasks = column.order
                    ? column.order.map((taskId) => data.tasks[taskId as keyof typeof data.tasks])
                    : [];

                  return (
                    <Column
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      tasks={tasks}
                      index={index}
                    />
                  );
                })}
              <div>
                <AddButton title="column" />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
