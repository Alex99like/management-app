import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/icons/circle.svg';
import { useEffect, useRef, useState } from 'react';
import SwitchTheme from './SwitchTheme';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DrawerLayout from './DrawerLayout';
import Button from '../Button/Button';
import buttonStyle from '../Button/Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import SwitchLanguage from './SwitchLanguage';
import { useAuth } from '../Form/useAuth';
import { useActions } from '../../../hooks/useAction';

function Header() {
  const [animate, setAnimate] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useActions();

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
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/main">Create Board</NavLink>
          </li>
          <li>Edit Profile</li>
          <li>
            <SwitchLanguage />
          </li>
        </ul>
      </nav>
      <div className={styles.rightPanel}>
        <SwitchTheme />
        <MenuRoundedIcon className={styles.burger} onClick={() => setMenuOpen((prev) => !prev)} />
        {!user ? (
          <>
            <div className={styles.buttons}>
              <NavLink to="/login" className={styles.logIn}>
                Log In
              </NavLink>
              <Button title="Sign In" link="/register" />
            </div>
          </>
        ) : (
          <button className={buttonStyle.button} onClick={() => logout({ navigate })}>
            Log Out
            <img src={arrow} alt="arrow" className={buttonStyle.arrow} />
          </button>
        )}
      </div>
      <DrawerLayout menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  );
}

export default Header;
