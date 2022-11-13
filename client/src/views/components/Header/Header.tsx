import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import '../../../style/buttons.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import logo from '../../../assets/images/logo.png';
import down from '../../../assets/icons/down.svg';
import { useEffect, useRef, useState } from 'react';
import SwitchTheme from './SwitchTheme';
import { Menu, MenuItem } from '@mui/material';

function Header() {
  const [animate, setAnimate] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        if (window.scrollY > 10) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      }, 10);
    };
  }, []);

  function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <header className={animate ? styles.headerActive : styles.header}>
      <NavLink to="/" className={styles.title}>
        <img src={logo} alt="logo" className={styles.logo} />
        Taskero
      </NavLink>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/main">Create Board</NavLink>
          </li>
          <li>Edit Profile</li>
          <li>
            <div className={styles.select} onClick={handleOpen}>
              <span>Language</span>
              <img src={down} alt="down" />
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>English</MenuItem>
              <MenuItem onClick={handleClose}>Russian</MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
      <div className={styles.rightPanel}>
        <SwitchTheme />
        <button type="button" className={styles.logIn}>
          Log In
        </button>
        <button type="button" className="button">
          Sign In
          <img src={arrow} alt="arrow" className={styles.arrow} />
        </button>
      </div>
    </header>
  );
}

export default Header;
