import React from 'react';
import styles from './FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { boardValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import { IBoardReq } from '../../../types/board.type';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader.json';

export interface IFormBoard {
  title: string;
  description: string;
  id: string;
}

interface IPropsFormBoard {
  activeModal: boolean;
  close: () => void;
  handleBoard: (data: IBoardReq) => void;
  board?: IFormBoard;
  loading: boolean;
}

export const FormBoard = ({ activeModal, close, handleBoard, board, loading }: IPropsFormBoard) => {
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
    handleBoard(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <>
        {loading && <Lottie className={cn(styles.loader)} animationData={Loader} />}
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
          <h2 className={styles.title}>
            {board ? `Update Board ${board.title}` : 'Create New Board'}
          </h2>
          <Field
            {...register('title', {
              required: 'Title is required',
              pattern: {
                value: boardValid,
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
                value: boardValid,
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
              {board ? 'Update' : 'Create'}
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
