import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../components/Form/Elements/Button/Button';
import { Field } from '../../components/Form/Elements/Field/Field';
import { IRegister } from '../../components/Form/form.interface';
import { nameValid } from '../../components/Form/validate';
import cn from 'classnames';
import styles from './EditPage.module.scss';
import { useActions } from '../../../hooks/useAction';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/form-loader.json';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

export const EditPage = () => {
  const { user, isLoading } = useAuth();
  const { updateUser } = useActions();
  const [bgDelete, setBgDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IRegister>({
    defaultValues: {
      login: user ? user.login : '',
      name: user ? user.name : '',
    },
  });

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    user && updateUser({ ...data, id: user.id });
  };

  return (
    <>
      {isLoading && (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      )}
      {user && (
        <div
          className={cn(styles.background, {
            [styles.bgExit]: bgDelete,
          })}
        >
          <div className={styles.container}>
            <div className={styles.profile}>
              <Button
                className={styles.deleteUser}
                onMouseEnter={() => setBgDelete(true)}
                onMouseOut={() => setBgDelete(false)}
                onClick={() => setOpenModal(true)}
              >
                Delete Account
              </Button>
              <div className={styles.avatar}></div>
              <div className={styles.data}>
                <h3 className={styles.name}>
                  <span>NAME: </span>
                  <p>{user.name}</p>
                </h3>
                <h3 className={styles.name}>
                  <span>LOGIN: </span>
                  <p>{user.login}</p>
                </h3>
              </div>
            </div>
            <h3 className={styles.id}>
              <span>Your ID: </span>
              {user.id}
            </h3>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Update User</legend>
              <Field
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: nameValid,
                    message: 'Please enter a valid name',
                  },
                })}
                icon={'BsEmojiSmile'}
                getValue={{ fn: getValues, name: 'name' }}
                placeholder="Name"
                active={!!user.name}
                error={errors.name}
              />
              <Field
                {...register('login', {
                  required: 'Login is required',
                  pattern: {
                    value: nameValid,
                    message: 'Please enter a valid login',
                  },
                })}
                icon={'BsPersonFill'}
                getValue={{ fn: getValues, name: 'login' }}
                placeholder="Login"
                active={!!user.login}
                error={errors.login}
              />
              <Field
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a valid email address',
                  },
                })}
                icon={'BsKeyFill'}
                getValue={{ fn: getValues, name: 'password' }}
                type="password"
                placeholder="Password"
                error={errors.password}
              />
            </fieldset>
            <Button className={styles.updateBtn}>UPDATE PROFILE</Button>
          </form>
          <ConfirmationModal id={user.id} open={openModal} setOpen={setOpenModal} title="Account" />
        </div>
      )}
    </>
  );
};
