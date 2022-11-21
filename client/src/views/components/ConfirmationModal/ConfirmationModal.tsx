import { Box, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './ConfirmationModal.module.scss';
import { useDeleteBoardMutation } from '../../../services/Board.service';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader-req-board.json';
import { toastr } from 'react-redux-toastr';

function ConfirmationModal(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: string;
}) {
  const { open, setOpen, title, id } = props;
  const handleClose = () => setOpen(false);

  const [deleteBoard, { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }] =
    useDeleteBoardMutation();

  useEffect(() => {
    if (isSuccessDelete) {
      toastr.success('Success!', `Board deleted!`);
      handleClose();
    }
  }, [isSuccessDelete]);

  return (
    <Modal
      className={styles.confirmationModal}
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <>
        {isLoadingDelete && <Lottie className={styles.loader} animationData={Loader} />}
        <Box className={styles.box}>
          <h4>Are you sure?</h4>
          <p>{title} will be deleted.</p>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={() => deleteBoard({ boardId: id })}>
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
