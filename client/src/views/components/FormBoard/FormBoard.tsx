import React from 'react';
import styles from './FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { nameValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import { IBoardReq } from '../../../types/board.type';

export interface IFormBoard {
  title: string;
  description: string;
}

interface IPropsFormBoard {
  activeModal: boolean;
  close: () => void;
  createBoard: (data: IBoardReq) => void;
  board?: IFormBoard;
}

export const FormBoard = ({ activeModal, close, createBoard, board }: IPropsFormBoard) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormBoard>({
    mode: 'onChange',
    defaultValues: {
      title: board?.title ? board.title : '',
      description: board?.description ? board.description : '',
    },
  });

  const onSubmit: SubmitHandler<IFormBoard> = (data) => {
    createBoard(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
        <h2 className={styles.title}>Create New Board</h2>
        <Field
          {...register('title', {
            required: 'Title is required',
            pattern: {
              value: nameValid,
              message: 'Please enter a valid title',
            },
          })}
          getValueBoard={{ fn: getValues, name: 'title' }}
          icon={'BsFileEarmarkWordFill'}
          error={errors.title}
          active={!!board}
          placeholder={'Title'}
        />
        <Field
          {...register('description', {
            required: 'Description is required',
            pattern: {
              value: nameValid,
              message: 'Please enter a valid description',
            },
          })}
          getValueBoard={{ fn: getValues, name: 'description' }}
          icon={'BsChatLeftTextFill'}
          error={errors.description}
          active={!!board}
          placeholder={'Description'}
        />
        <div className={styles.btnContainer}>
          <Button disabled={!isValid} className={cn(styles.btn, styles.create)}>
            Create
          </Button>
          <Button type={'button'} onClick={close} className={cn(styles.btn, styles.cancel)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
