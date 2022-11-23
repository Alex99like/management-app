import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../components/Form/Elements/Button/Button';
import { Field } from '../../components/Form/Elements/Field/Field';
import { IRegister } from '../../components/Form/form.interface';
import { nameValid } from '../../components/Form/validate';
import cn from 'classnames';
import styles from './EditPage.module.scss';

export const EditPage = () => {
  const { user } = useAuth();
  const [bgDelete, setBgDelete] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<IRegister>({
    defaultValues: {
      login: user ? user.login : '',
      name: user ? user.name : '',
    },
  });

  return (
    <>
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
              >
                Delete Account
              </Button>
              <div className={styles.avatar}></div>
              <div className={styles.data}>
                <h3 className={styles.name}>
                  <span>NAME: </span>
                  {user.name}
                </h3>
                <h3 className={styles.name}>
                  <span>LOGIN: </span>
                  {user.name}
                </h3>
              </div>
            </div>
            <h3 className={styles.id}>
              <span>Your ID: </span>
              {user.id}
            </h3>
          </div>
          <form className={styles.form}>
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
        </div>
      )}
    </>
  );
};
