import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Header.module.scss';
import buttonStyle from '../Button/Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useAction';
import { useTranslation } from 'react-i18next';

function Buttons() {
  const { user } = useAuth();
  const { logout, toggleRoutes } = useActions();
  const { t } = useTranslation();

  return (
    <div className={styles.buttons}>
      {!user ? (
        <>
          <NavLink to="/login" className={styles.primary}>
            Log&nbsp;In
          </NavLink>
          <Button title="Sign Up" link="/register" />
        </>
      ) : (
        <>
          <NavLink to="/main" className={styles.primary}>
            {t('header.main')}
          </NavLink>
          <button
            className={buttonStyle.button}
            onClick={() => {
              toggleRoutes(true);
              logout();
            }}
          >
            {t('header.logOut')}
            <img src={arrow} alt="arrow" className={buttonStyle.arrow} />
          </button>
        </>
      )}
    </div>
  );
}

export default Buttons;
