import React from 'react';
import styles from './FormBoard.module.scss';
import { useForm } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { nameValid } from '../Form/validate';

export interface IFormBoard {
  title: string;
  description: string;
}

export const FormBoard = () => {
  const { register, getValues } = useForm<IFormBoard>();
  return (
    <div className={styles.background}>
      <form>
        {/* <Field 
          {...register('title', {
            required: 'Title is required',
            pattern: {
              value: nameValid,
              message: 'Please enter a valid title',
            },
          })}
          getValue={{ fn: getValues, name: '' }}
        /> */}
      </form>
    </div>
  );
};
