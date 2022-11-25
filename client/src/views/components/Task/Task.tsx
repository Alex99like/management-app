import styles from './Task.module.scss';
import closeImg from '../../../assets/icons/close-button.svg';
import dotsImg from '../../../assets/icons/dots.svg';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Task(props: { task: string; columnsId: string; id: string }) {
  const { task, columnsId, id } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={styles.task}>
        <p>{task}</p>
        <img className={styles.image} src={dotsImg} alt="edit" onClick={() => setOpenModal(true)} />
        <img
          className={styles.image}
          src={closeImg}
          alt="close"
          onClick={() => setOpenModal(true)}
        />
      </div>
      <ConfirmationModal
        id={id}
        open={openModal}
        setOpen={setOpenModal}
        title="Task"
        columnsId={columnsId}
      />
    </>
  );
}

export default Task;
