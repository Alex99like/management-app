import { useGetUsersQuery } from '../../../services/Api.service';
import Board from '../../components/Board/Board';
import styles from './MainPage.module.scss';

function MainPage() {
  const { data } = useGetUsersQuery();

  console.log(data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h3>Your Boards</h3>
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
