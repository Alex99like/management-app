import styles from './Board.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import dotsImg from '../../../assets/icons/dots.svg';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';
import { IFormBoard } from '../FormBoard/FormBoard';

interface IBoardProps {
  board: {
    id: string;
    title: string;
    description: string;
  };
  update: (data: IFormBoard) => void;
  // formState: {
  //   activeForm: boolean;
  //   setActiveForm: Dispatch<SetStateAction<boolean>>;
  // };
}

function Board({ board: { title, description, id }, update }: IBoardProps) {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).classList.contains(styles.deleteImg)) {
      setOpenModal(true);
    } else if (!(e.target as HTMLDivElement).classList.contains(styles.image)) {
      navigate('/board');
    }
  }

  return (
    <>
      <div className={styles.board} onClick={(e) => handleClick(e)}>
        <div className={styles.container}>
          <h4 className={styles.title}>{title}</h4>
          <div>
            <img
              className={styles.image}
              src={dotsImg}
              alt="edit"
              onClick={() => update({ title, description })}
            />
            <img className={styles.deleteImg} src={deleteImg} alt="delete" />
          </div>
        </div>
        <p className={styles.description}>{description ? description : 'No description'}</p>
      </div>
      <ConfirmationModal id={id} open={openModal} setOpen={setOpenModal} title="All board data" />
    </>
  );
}

export default Board;
