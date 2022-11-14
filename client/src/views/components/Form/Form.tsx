import React, { useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './Elements/Button/Button';
import { Field } from './Elements/Field/Field';
import { SwitcherForm } from './Elements/SwitherForm/SwitcherForm';
import { IRegister } from './form.interface';
import styles from './Form.module.scss';
import { nameValid } from './validate';
import cn from 'classnames';
import { Close } from './Elements/Close/Close';
import { useSwitcher } from './useSwitcher';
import { useAuth } from './useAuth';
import { useActions } from '../../../hooks/useAction';

export const FormAuth = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<IRegister>();

  const [switcher, setSwitcher] = useState<'login' | 'register'>('register');
  const { switcherDown, switcherUp } = useSwitcher(switcher);

  const { isLoading } = useAuth();
  const { login: loginAction, register: registerAction } = useActions();

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    if (switcher === 'register') registerAction(data);
    else loginAction(data);
  };

  return (
    <div className={styles.background}>
      <form
        className={cn(styles.form, {
          [styles.switcherUp]: switcherUp,
          [styles.switcherDown]: switcherDown,
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Close />
        {switcher === 'register' && (
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
            error={errors.name}
          />
        )}
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
        <div className={styles['container-btn']}>
          <Button disabled={isLoading} type={'submit'} className={styles.btn}>
            Submit
          </Button>
          <Button disabled={isLoading} onClick={onReset} type={'reset'} className={styles.btn}>
            Reset
          </Button>
        </div>
        <SwitcherForm switcher={switcher} setSwitcher={setSwitcher} />
      </form>
    </div>
  );
};
