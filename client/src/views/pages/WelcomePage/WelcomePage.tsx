import styles from './WelcomePage.module.scss';
import circleImg from '../../../assets/icons/circle.svg';
import manImg from '../../../assets/images/man-developing-website.png';
import designProcessImg from '../../../assets/images/design-process.png';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import conceptImg from '../../../assets/images/concept-of-data-analysis.png';
import womenImg from '../../../assets/images/women.png';
import womenWithLaptopImg from '../../../assets/images/women-with-laptop.png';
import { NavLink } from 'react-router-dom';
import Card from './Card';

function WelcomePage() {
  const list = [
    'Keep your team focused with clear Kanban boards.',
    'Centralize requirements, visualize project progress.',
    'Communicate directly on tasks. Fewer meetings and mails.',
  ];

  const titles = ['Free-of-charge learning', 'Open to everyone', 'Learning materials'];

  const descriptions = [
    'The RS School is working by the principle of "Pay it forward." Members of our community share their knowledge and check students’ tasks for free.',
    'Everyone can study at RS School, regardless of age, professional employment, or place of residence. However, you should have sufficient base knowledge before the program begins.',
    'School’s documentation - https://docs.rs.school. You can find all materials on the YouTube channel. Discord chat for the students.',
  ];

  const links = [
    'https://wearecommunity.io/events/react-rs-school-2020',
    'https://rs.school/react/',
    'https://www.youtube.com/c/RollingScopesSchool',
  ];

  const images = [manImg, womenWithLaptopImg, womenImg];

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
      <section className={styles.section}>
        <div>
          <h3>Want to find out more?</h3>
          <h2>The Rolling Scopes.</h2>
        </div>
        <div className={styles.cards}>
          {images.map((img, i) => (
            <Card
              img={img}
              title={titles[i]}
              description={descriptions[i]}
              link={links[i]}
              key={titles[i]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
