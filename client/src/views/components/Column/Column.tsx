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
import { useAppSelector } from '../../../store/store';
import Task from '../Task/Task';
import { toastr } from 'react-redux-toastr';
import { FormTask, IFormTask } from '../FormTask/FormTask';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useActions } from '../../../hooks/useAction';
import EditInput from './EditInput';
import { useTranslation } from 'react-i18next';
import { ITasks } from '../../../types/tasks.type';

function Column(props: { title: string; id: string; index: number; order: number }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const { activeModal, task, closeModal, type, callCreate, callUpdate } = useFormTask();
  const { data } = useGetTasksQuery({ boardId, columnsId: props.id });
  const { t } = useTranslation();

  const [columnTasks, setColumnTasks] = useState<ITasks | undefined>(undefined);

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateTaskMutation();

  const [update, { isSuccess: isSuccessUpdate, data: dataItemUpdate, isLoading: isLoadingUpdate }] =
    useUpdateTaskMutation();

  const { setData } = useActions();
  // const dataTasksSort = columnTasks && [...columnTasks.tasks];
  const dataTasksSort = columnTasks && [...columnTasks.tasks];

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  useEffect(() => {
    setColumnTasks(data ? { ...data } : undefined);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.column.create')} ${dataItem ? dataItem.title : ''}!`
      );
      closeModal();
    }
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.column.update')} ${dataItemUpdate ? dataItemUpdate.title : ''}!`
      );
      closeModal();
    }
  }, [dataItemUpdate, isSuccessUpdate]);

  useEffect(() => {
    if (isLoadingCreate && !isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && !isLoadingUpdate) setLoading(false);
  }, [isLoadingCreate, isLoadingUpdate]);

  const handleTask = (data: IFormTask) => {
    if (type === 'create')
      create({
        task: { title: data.title, description: data.description, userId },
        boardId,
        columnsId: props.id,
      });
    if (type === 'update')
      update({
        task: {
          title: data.title,
          description: data.description,
          userId,
          order: task?.order as number,
          boardId,
          columnId: props.id,
        },
        taskId: task?.taskId as string,
      });
  };

  return (
    <>
      {activeModal && (
        <FormTask
          handleTask={handleTask}
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
            <div className={styles.container} {...provided.dragHandleProps}>
              {isEdit ? (
                <EditInput
                  setEdit={setEdit}
                  title={props.title}
                  columnsId={props.id}
                  order={props.order}
                />
              ) : (
                <h4 className={styles.title} onClick={() => setEdit(true)}>
                  {props.title}
                </h4>
              )}
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
                  {dataTasksSort && dataTasksSort?.length !== 0 ? (
                    dataTasksSort
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
                        <Task
                          key={task.id}
                          task={task}
                          columnsId={props.id}
                          index={index}
                          callUpdate={callUpdate}
                        />
                      ))
                  ) : (
                    <p className={styles.message}>{t('column')}</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddButton title={t('addButton.task')} callCreate={callCreate} />
            <ConfirmationModal
              id={props.id}
              open={openModal}
              setOpen={setOpenModal}
              title={t('confirmationModal.column')}
            />
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;
