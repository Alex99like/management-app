import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../Button/Button';
import styles from './SwitcherForm.module.scss';
import cn from 'classnames';

interface ISwither {
  setSwitcher: Dispatch<SetStateAction<'register' | 'login'>>;
  switcher: 'register' | 'login';
}

export const SwitcherForm = ({ setSwitcher, switcher }: ISwither) => {
  return (
    <div className={styles.container}>
      <Button
        type="button"
        onClick={() => setSwitcher('login')}
        className={cn(styles.btn, {
          [styles.active]: switcher === 'login',
        })}
      >
        Login
      </Button>
      <Button
        type="button"
        onClick={() => setSwitcher('register')}
        className={cn(styles.btn, {
          [styles.active]: switcher === 'register',
        })}
      >
        Register
      </Button>
    </div>
  );
};
