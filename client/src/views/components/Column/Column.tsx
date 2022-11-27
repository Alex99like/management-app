import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import AddButton from '../AddButton/AddButton';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useFormTask } from '../FormTask/useFormTask';
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../../services/Task.service';
import { useAppSelector, useRootState } from '../../../store/store';
import Task from '../Task/Task';
import { toastr } from 'react-redux-toastr';
import { ITaskReq } from '../../../types/tasks.type';
import { FormTask } from '../FormTask/FormTask';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useActions } from '../../../hooks/useAction';

function Column(props: { title: string; id: string; index: number }) {
  const [openModal, setOpenModal] = useState(false);
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const { activeModal, task, closeModal, type, callCreate } = useFormTask();
  const { data } = useGetTasksQuery({ boardId, columnsId: props.id });
  const [loading, setLoading] = useState(false);

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateTaskMutation();

  const [update, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation();

  const { setData } = useActions();
  const dataTasksSort = data && [...data.tasks];

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toastr.success('Success!', `Task created ${dataItem ? dataItem.title : ''}!`);
      closeModal();
    }
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isLoadingCreate && !isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && !isLoadingUpdate) setLoading(false);
  }, [isLoadingCreate, isLoadingUpdate]);

  const handleCreateTask = (data: ITaskReq) => {
    if (type === 'create')
      create({
        task: { title: data.title, description: data.description, userId },
        boardId,
        columnsId: props.id,
      });
  };

  return (
    <>
      {activeModal && (
        <FormTask
          handleTask={handleCreateTask}
          task={task}
          activeModal={activeModal}
          close={closeModal}
          loading={loading}
        />
      )}
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
                  {dataTasksSort &&
                    dataTasksSort
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          task={task.title}
                          columnsId={props.id}
                          index={index}
                        />
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddButton title="task" callCreate={callCreate} />
            <ConfirmationModal
              id={props.id}
              open={openModal}
              setOpen={setOpenModal}
              title="Column"
            />
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;
