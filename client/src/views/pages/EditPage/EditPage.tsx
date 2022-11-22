import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import styles from './EditPage.module.scss';

export const EditPage = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.profile}>
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
          <form></form>
        </div>
      )}
    </>
  );
};
