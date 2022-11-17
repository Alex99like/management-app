import styles from './Board.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import { useNavigate } from 'react-router-dom';

function Board(props: { title: string; description?: string }) {
  const { title, description } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate('/board');
  }

  return (
    <div className={styles.board} onClick={handleClick}>
      <div className={styles.container}>
        <h4 className={styles.title}>{title}</h4>
        <img className={styles.image} src={deleteImg} alt="delete" />
      </div>
      <p className={styles.description}>{description ? description : 'No description'}</p>
    </div>
  );
}

export default Board;
