import styles from './Board.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';

function Board(props: { title: string; description?: string }) {
  const { title, description } = props;
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).tagName !== 'IMG') {
      navigate('/board');
    } else {
      setOpenModal(true);
    }
  }

  return (
    <>
      <div className={styles.board} onClick={(e) => handleClick(e)}>
        <div className={styles.container}>
          <h4 className={styles.title}>{title}</h4>
          <img className={styles.image} src={deleteImg} alt="delete" />
        </div>
        <p className={styles.description}>{description ? description : 'No description'}</p>
      </div>
      <ConfirmationModal open={openModal} setOpen={setOpenModal} title="All board data" />
    </>
  );
}

export default Board;
