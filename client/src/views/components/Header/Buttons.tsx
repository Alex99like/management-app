import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Header.module.scss';
import buttonStyle from '../Button/Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import { useAuth } from '../Form/useAuth';
import { useActions } from '../../../hooks/useAction';

function Buttons() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useActions();

  return (
    <div className={styles.buttons}>
      {!user ? (
        <>
          <NavLink to="/login" className={styles.logIn}>
            Log In
          </NavLink>
          <Button title="Sign Up" link="/register" />
        </>
      ) : (
        <button className={buttonStyle.button} onClick={() => logout({ navigate })}>
          Log Out
          <img src={arrow} alt="arrow" className={buttonStyle.arrow} />
        </button>
      )}
    </div>
  );
}

export default Buttons;
