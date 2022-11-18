import { useDeleteBoardMutation, useUpdateBoardMutation } from '../../../services/Board.service';
import { useDeleteColumnMutation, useUpdateColumnMutation } from '../../../services/Column.service';
import Board from '../../components/Board/Board';
import styles from './MainPage.module.scss';

function MainPage() {
  const [create, { data }] = useDeleteColumnMutation();

  const handle = () => {
    create({
      boardId: '57d9f3af-216b-43f7-bd41-14fc32b63f28',
      columnsId: '1892f575-dddb-440e-b409-0d538861658d',
    });
  };
  // console.log(data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h3>Your Boards</h3>
        <button onClick={handle}>Create</button>
        <div className={styles.boards}>
          <Board title="task" />
          <Board title="task" />
          <Board title="task" />
          <Board title="task" />
          <Board title="task" />
          <Board title="task" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
