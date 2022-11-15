import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/images/logo.png';
import { useEffect, useRef, useState } from 'react';
import SwitchTheme from './SwitchTheme';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DrawerLayout from './DrawerLayout';
import Button from '../Button/Button';
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
            <NavLink to="/main">Boards</NavLink>
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
              <NavLink to="/login" className={styles.signIn}>
                Sign In
              </NavLink>
              <Button title="Sign Up" link="/register"/>
            </div>
          </>
        ) : (
          <button onClick={() => logout({ navigate })}>Logout</button>
        )}
      </div>
      <DrawerLayout menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  );
}

export default Header;
