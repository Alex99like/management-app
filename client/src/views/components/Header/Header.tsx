import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import '../../../style/buttons.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import logo from '../../../assets/images/logo.png';
import { useEffect, useState } from 'react';

function Header() {
  const [animation, setAnimation] = useState<boolean>(false);

  let timeout: ReturnType<typeof setTimeout>;
  let scroll = 0;
  useEffect(() => {
    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (window.scrollY > 10) {
          setAnimation(true);
        } else {
          setAnimation(false);
        }
        scroll = window.scrollY;
      }, 10);
    };
  }, []);

  return (
    <header className={animation ? styles.headerActive : styles.header}>
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
        </ul>
      </nav>
      <div className={styles.buttons}>
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
