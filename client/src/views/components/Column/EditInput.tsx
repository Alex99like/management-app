import { MaterialIconAI } from '../../../utils/MaterialIcon';
import closeImg from '../../../assets/icons/close-button.svg';
import okImg from '../../../assets/icons/ok.svg';
import styles from './Column.module.scss';
import { IFormColumn } from '../FormColumn/FormColumn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { columnValid } from '../Form/validate';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppSelector } from '../../../store/store';
import { useUpdateColumnMutation } from '../../../services/Column.service';
import { toastr } from 'react-redux-toastr';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/paperplane.json';
import cn from 'classnames';

function EditInput(props: {
  setEdit: Dispatch<SetStateAction<boolean>>;
  title: string;
  columnsId: string;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormColumn>();

  const [update, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, data: dataItemUpdate }] =
    useUpdateColumnMutation();

  const { setEdit, title, columnsId } = props;

  const boardId = useAppSelector((state) => state.root.boardId);

  const onSubmit: SubmitHandler<IFormColumn> = (data) => {
    update({ boardId, columnsId, column: { title: data.title, order: 1 } });
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      setEdit(false);
      toastr.success('Success!', `Column updated ${dataItemUpdate ? dataItemUpdate.title : ''}!`);
    }
  }, [dataItemUpdate, isSuccessUpdate, setEdit]);

  return (
    <>
      {isLoadingUpdate && <Lottie className={cn(styles.loader)} animationData={Loader} />}
      <form className={styles.edit} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          defaultValue={title}
          autoFocus
          {...register('title', {
            required: 'Title is required',
            pattern: {
              value: columnValid,
              message: 'Please enter a valid title',
            },
          })}
        />
        <div className={styles.controls}>
          <img className={styles.inputImg} src={okImg} alt="ok" onClick={handleSubmit(onSubmit)} />
          <img
            className={styles.inputImg}
            src={closeImg}
            alt="cancel"
            onClick={() => setEdit(false)}
          />
        </div>
        {errors.title && (
          <div className={styles.error}>
            <MaterialIconAI name="AiOutlineWarning" /> {errors.title.message}
          </div>
        )}
      </form>
    </>
  );
}

export default EditInput;
