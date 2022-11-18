import { Box, Divider, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './ConfirmationModal.module.scss';
import cn from 'classnames';

function ConfirmationModal(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}) {
  const { open, setOpen, title } = props;
  const [active, setActive] = useState(false);
  const [switcherUp, setSwitcherUp] = useState(false);
  const [switcherDown, setSwitcherDown] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setSwitcherUp(true);
    setTimeout(() => {
      setSwitcherUp(false);
      setSwitcherDown(true);
      setTimeout(() => {
        setSwitcherDown(false);
      }, 150);
    }, 150);
  }, [open]);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <Modal
      className={styles.confirmationModal}
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <Box
        className={cn(styles.box, {
          [styles.switcherUp]: switcherUp,
          [styles.switcherDown]: switcherDown,
          [styles.active]: active,
        })}
      >
        <div className={styles.message}>
          <h4>Are you sure?</h4>
          <p>{title} will be deleted.</p>
        </div>
        <Divider />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleClose}>
            OK
          </button>
          <button className={styles.button} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
