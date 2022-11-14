import React from 'react';
import { useActions } from '../../../../../hooks/useAction';
import styles from './Close.module.scss';

export const Close = () => {
  const { callModal } = useActions();

  return (
    <div className={styles.container} onClick={() => callModal()}>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </div>
  );
};
