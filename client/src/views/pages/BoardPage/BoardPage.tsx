import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';

function BoardPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPanel}>
        <NavLink to="/main" className={styles.button}>
          <img src={arrow} alt="arrow" className={styles.arrow} />
          Back
        </NavLink>
        <h3>Task title</h3>
      </div>
      <div className={styles.board}>
        <Column title="column1" />
        <Column title="column2" />
        <Column title="column3" />
        <Column title="column4" />
        <Column title="column5" />
        <Column title="column6" />
        <div>
          <AddButton title="column" />
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
