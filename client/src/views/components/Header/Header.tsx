import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/icons/circle.svg';
import { useEffect, useRef, useState } from 'react';
import SwitchTheme from './SwitchTheme';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DrawerLayout from './DrawerLayout';
import SwitchLanguage from './SwitchLanguage';
import Buttons from './Buttons';
import { useAuth } from '../../../hooks/useAuth';

function Header() {
  const [animate, setAnimate] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { user } = useAuth();

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

  return (
    <header className={animate ? styles.headerActive : styles.header}>
      <NavLink to="/" className={styles.title} onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo" className={styles.logo} />
        Taskero
      </NavLink>
      {user && (
        <nav>
          <ul className={styles.navList}>
            <li>Create Board</li>
            <li>Edit Profile</li>
            <li>
              <SwitchLanguage />
            </li>
          </ul>
        </nav>
      )}
      <div className={styles.rightPanel}>
        <SwitchTheme />
        <MenuRoundedIcon className={styles.burger} onClick={() => setMenuOpen((prev) => !prev)} />
        <Buttons />
      </div>
      <DrawerLayout menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  );
}

export default Header;
