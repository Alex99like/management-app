import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const backgroundColor = (isActive: unknown) => (isActive ? '#f0f0f0' : '#fff');

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/">taskero</NavLink>
      <NavLink
        style={({ isActive }) => ({
          backgroundColor: backgroundColor(isActive),
        })}
        to="/main"
      >
        Create board
      </NavLink>
      <div>
        <button type="button">Log In</button>
        <button type="button">Sign In</button>
      </div>
    </header>
  );
}

export default Header;
