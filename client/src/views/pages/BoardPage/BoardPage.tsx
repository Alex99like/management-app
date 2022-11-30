import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import {
  useCreateColumnMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
} from '../../../services/Column.service';
import { useGetBoardsQuery } from '../../../services/Board.service';
import { useAppSelector, useRootState } from '../../../store/store';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/page-loader.json';
import cn from 'classnames';
import { FormColumn } from '../../components/FormColumn/FormColumn';
import { useFormColumn } from '../../components/FormColumn/useFormColumn';
import { useEffect, useState } from 'react';
import { IColumnReq } from '../../../types/column.type';
import { toastr } from 'react-redux-toastr';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../../services/Task.service';
import { ITask } from '../../../types/tasks.type';
import LoaderPlane from '../../../assets/animation/paperplane.json';

function BoardPage() {
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);

  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useGetColumnsQuery({ boardId });
  const { data: boardData } = useGetBoardsQuery();
  const { activeModal, column, closeModal, callCreate } = useFormColumn();

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateColumnMutation();

  const [update, { isLoading: isLoadingUpdate }] = useUpdateColumnMutation();
  const [updateTask, { isLoading: isLoadingTaskUpdate }] = useUpdateTaskMutation();
  const [createTask, { isLoading: isLoadingTaskCreate }] = useCreateTaskMutation();
  const [deleteTask, { isLoading: isLoadingTaskDelete }] = useDeleteTaskMutation();

  const state = useRootState();
  const dataSort = data && [...data];

  useEffect(() => {
    if (isSuccess) {
      toastr.success('Success!', `Column created ${dataItem ? dataItem.title : ''}!`);
      closeModal();
    }
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isLoadingCreate && !isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && isLoadingUpdate) setLoading(true);
    if (isLoadingTaskUpdate) setLoading(true);
    if (isLoadingTaskCreate) setLoading(true);
    if (isLoadingTaskDelete) setLoading(true);
    if (
      !isLoadingCreate &&
      !isLoadingUpdate &&
      !isLoadingTaskUpdate &&
      !isLoadingTaskCreate &&
      !isLoadingTaskDelete
    )
      setLoading(false);
  }, [
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingTaskUpdate,
    isLoadingTaskDelete,
    isLoadingTaskCreate,
  ]);

  const handleCreateColumn = (data: IColumnReq) => {
    create({ column: { title: data.title }, boardId });
  };

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column' && data) {
      const columnsOrder: string[] = [];
      const copy = [...data];
      copy
        .sort((a, b) => a.order - b.order)
        .forEach((column) => {
          columnsOrder.push(column.id);
        });
      const newColumnOrder = Array.from(columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      newColumnOrder.forEach(async (column, index) => {
        const columnToChange = data.find((columnData) => columnData.id === column);
        if (columnToChange) {
          await update({
            column: { order: index + 1, title: columnToChange.title },
            boardId,
            columnsId: column,
          });
        }
      });
      return;
    }

    const start = data?.find((column) => column.id === source.droppableId);
    const finish = data?.find((column) => column.id === destination.droppableId);

    if (start === finish && start) {
      const column = state.initialData.columns[start.id as keyof typeof state.initialData.columns];
      if (column) {
        const newTaskOrder = Array.from(column.order as Record<string, string>[]);
        const actualTask = newTaskOrder[source.index];
        newTaskOrder?.splice(source.index, 1);
        newTaskOrder?.splice(destination.index, 0, actualTask);

        newTaskOrder.forEach((newTask, index) => {
          updateTask({
            taskId: newTask.id,
            task: {
              boardId,
              order: index + 1,
              columnId: start.id,
              title: newTask.title,
              description: newTask.description,
              userId,
            },
          });
        });

        return;
      }
    } else {
      if (start && finish) {
        const startColumn =
          state.initialData.columns[start.id as keyof typeof state.initialData.columns];
        const finishColumn =
          state.initialData.columns[finish.id as keyof typeof state.initialData.columns];
        if (startColumn && finishColumn) {
          const startTaskOrder = Array.from(startColumn.order as Record<string, string>[]);
          const actualTask = { ...startTaskOrder[source.index] };
          startTaskOrder.splice(source.index, 1);
          const finishTaskOrder = Array.from(finishColumn.order as Record<string, string>[]);

          deleteTask({
            boardId,
            columnsId: start.id,
            taskId: actualTask.id,
          });
          const createdTask = await createTask({
            boardId,
            columnsId: finish.id,
            task: {
              title: actualTask.title,
              description: actualTask.description,
              userId,
            },
          });
          actualTask.id = (createdTask as { data: ITask }).data.id;
          finishTaskOrder.splice(destination.index, 0, actualTask);
          startTaskOrder.forEach((newTask, index) => {
            updateTask({
              taskId: newTask.id,
              task: {
                boardId,
                order: index + 1,
                columnId: start.id,
                title: newTask.title,
                description: newTask.description,
                userId,
              },
            });
          });
          finishTaskOrder.forEach((newTask, index) => {
            updateTask({
              taskId: newTask.id,
              task: {
                boardId,
                order: index + 1,
                columnId: finish.id,
                title: newTask.title,
                description: newTask.description,
                userId,
              },
            });
          });
        }
      }
    }
  };

  return (
    <div className={`${styles.boardPage} ${isLightTheme ? styles.lightTheme : styles.darkTheme}`}>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Lottie
            className={cn(styles.loader, { [styles.active]: isLoading })}
            animationData={Loader}
          />
        ) : (
          <>
            {(isLoadingCreate ||
              isLoadingUpdate ||
              isLoadingTaskUpdate ||
              isLoadingTaskCreate ||
              isLoadingTaskDelete) && (
              <Lottie className={cn(styles.loaderPlane)} animationData={LoaderPlane} />
            )}
            {activeModal && (
              <FormColumn
                handleColumn={handleCreateColumn}
                column={column}
                activeModal={activeModal}
                close={closeModal}
                loading={loading}
              />
            )}
            <div className={styles.topPanel}>
              <NavLink to="/main" className={styles.button}>
                <img src={arrow} alt="arrow" className={styles.arrow} />
                Back
              </NavLink>
              <h3 style={{ color: isLightTheme ? '#000' : '#fff' }}>
                {boardData?.find((board) => board.id === boardId)?.title || ''}
              </h3>
            </div>
            <div className={styles.boardContainer}>
              <DragDropContext onDragEnd={dragEndHandler}>
                <Droppable droppableId="all" direction="horizontal" type="column">
                  {(provided) => (
                    <div
                      className={styles.board}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {dataSort &&
                        dataSort
                          .sort((a, b) => a.order - b.order)
                          .map((column, index) => {
                            return (
                              <Column
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                index={index}
                              />
                            );
                          })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div>
                  <AddButton title="column" callCreate={callCreate} />
                </div>
              </DragDropContext>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BoardPage;
