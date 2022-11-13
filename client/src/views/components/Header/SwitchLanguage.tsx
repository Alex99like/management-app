import { Menu, MenuItem } from '@mui/material';
import styles from './Header.module.scss';
import down from '../../../assets/icons/down.svg';
import { useState } from 'react';

function SwitchLanguage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <div className={styles.select} onClick={handleOpen}>
        <span>Language</span>
        <img src={down} alt="down" />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} sx={{ fontFamily: 'inherit' }}>
          English
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: 'inherit' }}>
          Russian
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SwitchLanguage;
