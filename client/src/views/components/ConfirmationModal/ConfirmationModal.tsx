import { Box, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './ConfirmationModal.module.scss';
import { useDeleteBoardMutation } from '../../../services/Board.service';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader-req-board.json';
import { toastr } from 'react-redux-toastr';
import { useDeleteColumnMutation } from '../../../services/Column.service';
import { useAppSelector } from '../../../store/store';
import { useActions } from '../../../hooks/useAction';
import { useAuth } from '../../../hooks/useAuth';

function ConfirmationModal(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: string;
}) {
  const { open, setOpen, title, id } = props;
  const boardId = useAppSelector((state) => state.root.boardId);
  const handleClose = () => setOpen(false);
  const { deleteUser, toggleRoutes, logout } = useActions();
  const { user } = useAuth();

  const [deleteBoard, { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }] =
    useDeleteBoardMutation();

  const [deleteColumn, { isSuccess: isSuccessColumnDelete, isLoading: isLoadingColumnDelete }] =
    useDeleteColumnMutation();

  useEffect(() => {
    if (isSuccessDelete || isSuccessColumnDelete) {
      toastr.success('Success!', `${title} deleted!`);
      handleClose();
    }
  }, [isSuccessDelete, isSuccessColumnDelete]);

  const handleDelete = () => {
    switch (title) {
      case 'Column':
        deleteColumn({ boardId, columnsId: id });
        break;
      case 'All board data':
        deleteBoard({ boardId: id });
        break;
      case 'Account':
        toggleRoutes(true);
        logout();
        user && deleteUser({ id: user?.id });
        break;
    }
  };

  return (
    <Modal
      className={styles.confirmationModal}
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <>
        {(isLoadingDelete || isLoadingColumnDelete) && (
          <Lottie className={styles.loader} animationData={Loader} />
        )}
        <Box className={styles.box}>
          <h4>Are you sure?</h4>
          <p>{title} will be deleted.</p>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleDelete}>
              OK
            </button>
            <button className={styles.button} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </>
    </Modal>
  );
}

export default ConfirmationModal;
