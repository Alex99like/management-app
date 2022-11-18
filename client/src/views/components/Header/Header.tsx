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
import { useTranslation } from 'react-i18next';

function Header() {
  const [animate, setAnimate] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const { user } = useAuth();

  function handleScroll(elTopOffset: number) {
    if (window.pageYOffset > elTopOffset) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }

  useEffect(() => {
    const header = (headerRef.current as HTMLElement).getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <header className={animate ? styles.headerActive : styles.header} ref={headerRef}>
      <NavLink to="/" className={styles.title} onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo" className={styles.logo} />
        Taskero
      </NavLink>
      {user && (
        <nav>
          <ul className={styles.navList}>
            <li>{t('header.board')}</li>
            <li>{t('header.profile')}</li>
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
