import { useEffect, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { useGetUsersQuery } from '../../../services/Api.service';
import { useCreateBoardMutation, useGetBoardsQuery } from '../../../services/Board.service';
import { IBoardReq } from '../../../types/board.type';
import { MaterialIconBS } from '../../../utils/MaterialIcon';
import Board from '../../components/Board/Board';
import { FormBoard } from '../../components/FormBoard/FormBoard';
import styles from './MainPage.module.scss';

function MainPage() {
  const { data } = useGetBoardsQuery();
  const [create, { isSuccess, data: dataItem }] = useCreateBoardMutation();
  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toastr.success('Success!', `Board created ${dataItem ? dataItem.title : ''} !`);
      setActiveForm(false);
    }
  }, [isSuccess]);

  const handleCreateBoard = (data: IBoardReq) => {
    create(data);
  };

  return (
    <>
      {activeForm && (
        <FormBoard
          createBoard={handleCreateBoard}
          activeModal={activeForm}
          setActiveModal={setActiveForm}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h3>Your Boards</h3>
          <div className={styles.boards}>
            <button className={styles.newBoard} onClick={() => setActiveForm(true)}>
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
