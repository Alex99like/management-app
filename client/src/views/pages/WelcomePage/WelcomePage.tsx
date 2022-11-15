import styles from './WelcomePage.module.scss';
import circleImg from '../../../assets/icons/circle.svg';
import manImg from '../../../assets/images/man-developing-website.png';
import designProcessImg from '../../../assets/images/design-process.png';
import conceptImg from '../../../assets/images/concept-of-data-analysis.png';
import womenImg from '../../../assets/images/women.png';
import womenWithLaptopImg from '../../../assets/images/women-with-laptop.png';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import Button from '../../components/Button/Button';
import { useAuth } from '../../components/Form/useAuth';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const links = [
    'https://wearecommunity.io/events/react-rs-school-2020',
    'https://rs.school/react/',
    'https://www.youtube.com/c/RollingScopesSchool',
  ];

  const images = [manImg, womenWithLaptopImg, womenImg];
  const { t } = useTranslation();

  const { user } = useAuth();

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div>
          <h3>{t('welcomePage.subtitle')}</h3>
          <h1>{t('welcomePage.title')}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <p>{t('welcomePage.info')}</p>
            <ul>
              {(t('welcomePage.list', { returnObjects: true }) as string[]).map((item) => (
                <li key={item.slice(0, 10)} className={styles.listItem}>
                  <img src={circleImg} alt="circle" />
                  {item}
                </li>
              ))}
            </ul>
            <NavLink to="/main" className="button">
              {user ? (
                <Button title={t('welcomePage.getStarted')} link="/main" />
              ) : (
                <Button title={t('welcomePage.getStarted')} link="/register" />
              )}
            </NavLink>
          </div>
          <img src={designProcessImg} alt="image" className={styles.image} />
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <h3>{t('welcomePage.rssSubTitle')}</h3>
          <h2>{t('welcomePage.rssTitle')}</h2>
        </div>
        <div className={styles.cards}>
          {images.map((img, i) => (
            <Card
              img={img}
              title={(t('welcomePage.titles', { returnObjects: true }) as string[])[i]}
              description={(t('welcomePage.descriptions', { returnObjects: true }) as string[])[i]}
              link={links[i]}
              key={(t('welcomePage.titles', { returnObjects: true }) as string[])[i]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
