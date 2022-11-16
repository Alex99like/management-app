import styles from './WelcomePage.module.scss';
import alexImg from '../../../assets/team/alex.jpg';
import annaImg from '../../../assets/team/anna.jpg';
import mariaImg from '../../../assets/team/maria.jpg';
import githubImg from '../../../assets/icons/github.svg';

function TeamMember(props: { name: string; index: number }) {
  const { name, index } = props;
  const avatars = [alexImg, annaImg, mariaImg];
  const links = [
    'https://github.com/Alex99like',
    'https://github.com/muannna',
    'https://github.com/sleepyMaryAlex',
  ];
  const quotes = [
    'I think, the art of programming is a little more complicated than other human skills. Programming makes you better in the same way that learning a foreign language, math, or reading books helps you develop.',
    'For a long time it was a mystery to me how something very expensive and technologically advanced could be so useless. And I soon realized that a computer is a stupid machine that has the ability to do incredibly smart things, while programmers are smart people who have a talent for doing incredibly stupid things. In short, they found each other.',
    'Programming is hard. The basic rules on which everything is built are very simple, but as the program develops, it itself begins to introduce its own rules and laws. Thus, the programmer builds a labyrinth in which he himself can get lost.',
  ];
  const statuses = ['Team leader, Frontend developer', 'Frontend developer', 'Frontend developer'];

  return (
    <div className={styles.teamMember}>
      <img className={styles.avatar} src={avatars[index]} alt="avatar" />
      <div className={styles.info}>
        <div className={styles.heading}>
          <div className={styles.name}>
            <h4>{name}</h4>
            <a href={links[index]} target="_blank" rel="noreferrer">
              <img src={githubImg} alt="github" className={styles.github} />
            </a>
          </div>
          <p>{statuses[index]}</p>
        </div>
        <p className={styles.quote}>
          <span>❝</span>
          {quotes[index]}
          <span>❞</span>
        </p>
      </div>
    </div>
  );
}

export default TeamMember;
