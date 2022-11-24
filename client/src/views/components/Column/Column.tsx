import styles from './Column.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import AddButton from '../AddButton/AddButton';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Column(props: { title: string; id: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.column}>
      <div className={styles.container}>
        <h4 className={styles.title}>{props.title}</h4>
        <img
          className={styles.image}
          src={deleteImg}
          alt="delete"
          onClick={() => setOpenModal(true)}
        />
      </div>
      <div className={styles.tasks}></div>
      <AddButton title="task" />
      <ConfirmationModal id={props.id} open={openModal} setOpen={setOpenModal} title="Column" />
    </div>
  );
}

export default Column;
