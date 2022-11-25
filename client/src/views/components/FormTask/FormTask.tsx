import React from 'react';
import styles from '../FormBoard/FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { taskValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader-req-board.json';
import { ITaskReq } from '../../../types/tasks.type';

export interface IFormTask {
  title: string;
  description: string;
  userId: string;
}

interface IPropsFormTask {
  activeModal: boolean;
  close: () => void;
  handleTask: (data: ITaskReq) => void;
  task?: IFormTask;
  loading: boolean;
}

export const FormTask = ({ activeModal, close, handleTask, task, loading }: IPropsFormTask) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormTask>({
    mode: 'onChange',
    defaultValues: {
      title: task?.title ? task.title : '',
    },
  });

  const onSubmit: SubmitHandler<IFormTask> = (data) => {
    handleTask(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <>
        {loading && <Lottie className={cn(styles.loader)} animationData={Loader} />}
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
          <h2 className={styles.title}>{task ? `Update Task ${task.title}` : 'Create New Task'}</h2>
          <Field
            {...register('title', {
              required: 'Title is required',
              pattern: {
                value: taskValid,
                message: 'Please enter a valid title',
              },
            })}
            getValueTask={{ fn: getValues, name: 'title' }}
            icon={'BsFileEarmarkWordFill'}
            error={errors.title}
            active={!!task}
            placeholder={'Title'}
          />
          <Field
            {...register('description', {
              required: 'Description is required',
              pattern: {
                value: taskValid,
                message: 'Please enter a valid description',
              },
            })}
            getValueTask={{ fn: getValues, name: 'description' }}
            icon={'BsChatLeftTextFill'}
            error={errors.description}
            active={!!task}
            placeholder={'Description'}
          />
          <div className={styles.btnContainer}>
            <Button disabled={!isValid} className={cn(styles.btn, styles.create)}>
              {task ? 'Update' : 'Create'}
            </Button>
            <Button type={'button'} onClick={close} className={cn(styles.btn, styles.cancel)}>
              Cancel
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
};
