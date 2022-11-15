import styles from './WelcomePage.module.scss';
import circleImg from '../../../assets/icons/circle.svg';
import manImg from '../../../assets/images/man-developing-website.png';
import designProcessImg from '../../../assets/images/design-process.png';
import conceptImg from '../../../assets/images/concept-of-data-analysis.png';
import womenImg from '../../../assets/images/women.png';
import womenWithLaptopImg from '../../../assets/images/women-with-laptop.png';
import Card from './Card';
import Button from '../../components/Button/Button';
import { useAuth } from '../../components/Form/useAuth';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import Team from './Team';

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
      <section className={styles.aboutProjectSection}>
        <div>
          <h3>{t('welcomePage.subtitle')}</h3>
          <h1>{t('welcomePage.title')}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <p>{t('welcomePage.info')}</p>
            <ul>
              {t<string, string[]>('welcomePage.list', { returnObjects: true }).map((item) => (
                <li key={item.slice(0, 10)} className={styles.listItem}>
                  <img src={circleImg} alt="circle" />
                  {item}
                </li>
              ))}
            </ul>
            {user ? (
              <Button title={t('welcomePage.getStarted')} link="/main" />
            ) : (
              <Button title={t('welcomePage.getStarted')} link="/register" />
            )}
          </div>
          <img src={designProcessImg} alt="image" className={styles.image} />
        </div>
      </section>
      <Divider />
      <section className={styles.aboutCourseSection}>
        <div>
          <h3>{t('welcomePage.rssSubTitle')}</h3>
          <h2>{t('welcomePage.rssTitle')}</h2>
        </div>
        <div className={styles.cards}>
          {images.map((img, i) => (
            <Card
              img={img}
              title={t<string, string[]>('welcomePage.titles', { returnObjects: true })[i]}
              description={
                t<string, string[]>('welcomePage.descriptions', { returnObjects: true })[i]
              }
              link={links[i]}
              key={t<string, string[]>('welcomePage.titles', { returnObjects: true })[i]}
            />
          ))}
        </div>
      </section>
      <Divider />
      <div className={styles.aboutTeamWrapper}>
        <section className={styles.aboutTeamSection}>
          <div>
            <h3>Here are the developers who created this app</h3>
            <h2>Our Team.</h2>
          </div>
          <Team />
        </section>
      </div>
    </div>
  );
}

export default WelcomePage;
