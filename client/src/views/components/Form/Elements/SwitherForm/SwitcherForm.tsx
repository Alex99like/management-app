import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../Button/Button';
import styles from './SwitcherForm.module.scss';
import cn from 'classnames';

interface ISwither {
  setSwitcher: Dispatch<SetStateAction<'register' | 'login'>>;
  switcher: 'register' | 'login';
  onDisabled: boolean;
}

export const SwitcherForm = ({ setSwitcher, switcher, onDisabled }: ISwither) => {
  return (
    <div className={styles.container}>
      <Button
        disabled={onDisabled}
        type="button"
        onClick={() => setSwitcher('login')}
        className={cn(styles.btn, {
          [styles.active]: switcher === 'login',
        })}
      >
        Login
      </Button>
      <Button
        disabled={onDisabled}
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
