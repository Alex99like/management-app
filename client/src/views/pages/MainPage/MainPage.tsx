import { useEffect, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from '../../../services/Board.service';
import { IBoardReq } from '../../../types/board.type';
import { MaterialIconBS } from '../../../utils/MaterialIcon';
import Board from '../../components/Board/Board';
import { FormBoard } from '../../components/FormBoard/FormBoard';
import styles from './MainPage.module.scss';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loder-border.json';
import cn from 'classnames';
import { useFormBoard } from '../../components/FormBoard/useFormBoard';

function MainPage() {
  const { data, isLoading } = useGetBoardsQuery();
  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateBoardMutation();

  const [update, { isSuccess: isSuccessUpdate, data: dataItemUpdate, isLoading: isLoadingUpdate }] =
    useUpdateBoardMutation();

  const { activeModal, closeModal, callCreate, callUpdate, board, type } = useFormBoard();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoadingCreate && !isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && !isLoadingUpdate) setLoading(false);
  }, [isLoadingCreate, isLoadingUpdate]);

  useEffect(() => {
    if (isSuccess) {
      toastr.success('Success!', `Board created ${dataItem ? dataItem.title : ''} !`);
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toastr.success('Success!', `Board update ${dataItemUpdate ? dataItemUpdate.title : ''} !`);
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItemUpdate, isSuccessUpdate]);

  const handleCreateBoard = (data: IBoardReq) => {
    if (type === 'create') create(data);
    if (type === 'update' && board) update({ board: data, boardId: board.id });
  };

  return (
    <>
      {isLoading && (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      )}
      {activeModal && (
        <FormBoard
          handleBoard={handleCreateBoard}
          board={board}
          activeModal={activeModal}
          close={closeModal}
          loading={loading}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.main}>
          {!isLoading && <h3>Your Boards</h3>}
          <div className={styles.boards}>
            {!isLoading && (
              <button className={styles.newBoard} onClick={callCreate}>
                <div className={styles.dashed}>
                  <span className={styles.add}>
                    <MaterialIconBS name={'BsPlusLg'} />
                  </span>
                  <h3 className={styles.title}>Add New Board</h3>
                </div>
              </button>
            )}
            {data &&
              data.map((board) => <Board key={board.id} board={board} update={callUpdate} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
