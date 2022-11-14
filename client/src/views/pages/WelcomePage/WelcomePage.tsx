import styles from './WelcomePage.module.scss';
import circleImg from '../../../assets/icons/circle.svg';
import manImg from '../../../assets/images/man-developing-website.png';
import designProcessImg from '../../../assets/images/design-process.png';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import conceptImg from '../../../assets/images/concept-of-data-analysis.png';
import womenImg from '../../../assets/images/women.png';
import womenWithLaptopImg from '../../../assets/images/women-with-laptop.png';
import { NavLink } from 'react-router-dom';

function WelcomePage() {
  return <div className={styles.container}>Welcome</div>;
  const list = [
    'Keep your team focused with clear Kanban boards.',
    'Centralize requirements, visualize project progress.',
    'Communicate directly on tasks. Fewer meetings and mails.',
  ];
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div>
          <h3>Visualize Your Workflows, Get More Done</h3>
          <h1>Kanban Board: Your Fast Track to Process Optimization.</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <p>
              Unlock the power of Kanban! Use Taskero’s Kanban boards to visualize workflows, boost
              team productivity and support agile project management.
            </p>
            <ul>
              {list.map((item) => (
                <li key={item.slice(0, 10)} className={styles.listItem}>
                  <img src={circleImg} alt="circle" />
                  {item}
                </li>
              ))}
            </ul>
            <NavLink to="/main" className="button">
              Get Started
              <img src={arrow} alt="arrow" className="arrow" />
            </NavLink>
          </div>
          <img src={designProcessImg} alt="image" className={styles.image} />
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
