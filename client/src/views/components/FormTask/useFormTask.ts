import { useState } from 'react';
import { IFormTask } from './FormTask';

export const useFormTask = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [type, setType] = useState<'create' | 'update'>('create');
  const [task, setTask] = useState<IFormTask>();

  const closeModal = () => {
    setActiveModal(false);
  };

  const callCreate = () => {
    setTask(undefined);
    setType('create');
    setActiveModal(true);
  };

  const callUpdate = (data: IFormTask) => {
    setTask(data);
    setType('update');
    setActiveModal(true);
  };

  return { activeModal, closeModal, callCreate, callUpdate, task, type };
};
