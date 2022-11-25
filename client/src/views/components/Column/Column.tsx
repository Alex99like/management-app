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
import { ITaskReq } from '../../../types/tasks.type';
import { FormTask } from '../FormTask/FormTask';

function Column(props: { title: string; id: string }) {
  const [openModal, setOpenModal] = useState(false);
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const { activeModal, task, closeModal, type, callCreate } = useFormTask();
  const { data } = useGetTasksQuery({ boardId, columnsId: props.id });
  const [loading, setLoading] = useState(false);

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateTaskMutation();

  const [update, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation();

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
        <div className={styles.tasks}>
          {data?.tasks &&
            data?.tasks.map((task) => (
              <Task key={task.id} id={task.id} task={task.title} columnsId={props.id} />
            ))}
        </div>
        <AddButton title="task" callCreate={callCreate} />
        <ConfirmationModal id={props.id} open={openModal} setOpen={setOpenModal} title="Column" />
      </div>
    </>
  );
}

export default Column;
