import { useGetUsersQuery } from '../../../services/Api.service';
import { useCreateBoardMutation, useGetBoardsQuery } from '../../../services/Board.service';
import { MaterialIconBS } from '../../../utils/MaterialIcon';
import Board from '../../components/Board/Board';
import { FormBoard } from '../../components/FormBoard/FormBoard';
import styles from './MainPage.module.scss';

function MainPage() {
  const { data } = useGetBoardsQuery();
  const [create, { isSuccess }] = useCreateBoardMutation();

  const handleCreateBoard = () => {
    create({ title: 'task 2', description: 'any description 2' });
  };
  console.log(isSuccess);

  return (
    <>
      <FormBoard />
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h3>Your Boards</h3>
          <div className={styles.boards}>
            <button className={styles.newBoard}>
              <div className={styles.dashed}>
                <span className={styles.add}>
                  <MaterialIconBS name={'BsPlusLg'} />
                </span>
                <h3 className={styles.title}>Add New Board</h3>
              </div>
            </button>
            {data && data.map((board) => <Board key={board.id} board={board} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
