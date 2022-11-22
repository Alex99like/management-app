import { useState } from 'react';
import { IFormColumn } from './FormColumn';

export const useFormColumn = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [type, setType] = useState<'create' | 'update'>('create');
  const [column, setColumn] = useState<IFormColumn>();

  const closeModal = () => {
    setActiveModal(false);
  };

  const callCreate = () => {
    setColumn(undefined);
    setType('create');
    setActiveModal(true);
  };

  const callUpdate = (data: IFormColumn) => {
    setColumn(data);
    setType('update');
    setActiveModal(true);
  };

  return { activeModal, closeModal, callCreate, callUpdate, column, type };
};
