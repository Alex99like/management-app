import { Menu, MenuItem } from '@mui/material';
import styles from './Header.module.scss';
import down from '../../../assets/icons/down.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18next';

function SwitchLanguage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
    setAnimate(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose(key: string) {
    setAnimate(false);
    setAnchorEl(null);
    if (typeof key === 'string') {
      i18n.changeLanguage(key);
    }
  }

  return (
    <div>
      <div className={styles.select} onClick={handleOpen}>
        <span>{t('header.language.lang')}</span>
        <img src={down} alt="down" className={animate ? styles.downRotate : styles.down} />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleClose('en')} sx={{ fontFamily: 'inherit' }}>
          {t('header.language.en')}
        </MenuItem>
        <MenuItem onClick={() => handleClose('ru')} sx={{ fontFamily: 'inherit' }}>
          {t('header.language.ru')}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SwitchLanguage;
