import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';

function BoardPage() {
  const columns = [];
  for (let i = 0; i < 6; i++) {
    columns.push(<Column key={i + 1} id={`${i + 1}`} title={`column${i + 1}`} />);
  }

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
        {columns}
        <div>
          <AddButton title="column" />
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
