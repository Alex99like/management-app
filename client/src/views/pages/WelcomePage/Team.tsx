import styles from './WelcomePage.module.scss';
import alexImg from '../../../assets/team/alex.jpg';
import annaImg from '../../../assets/team/anna.jpg';
import mariaImg from '../../../assets/team/maria.jpg';
import githubImg from '../../../assets/icons/github.svg';

function Team() {
  return (
    <div className={styles.team}>
      <div className={styles.teamMember}>
        <img className={styles.avatar} src={alexImg} alt="avatar" />
        <div className={styles.info}>
          <div className={styles.heading}>
            <div className={styles.name}>
              <h4>Aleksander Aleksievich</h4>
              <a href="https://github.com/Alex99like">
                <img src={githubImg} alt="github" className={styles.github} />
              </a>
            </div>
            <p>Team leader, Frontend developer</p>
          </div>
          <p className={styles.quote}>
            <span>❝</span>I think, the art of programming is a little more complicated than other
            human skills. Programming makes you better in the same way that learning a foreign
            language, math, or reading books helps you develop.<span>❞</span>
          </p>
        </div>
      </div>
      <div className={styles.teamMember}>
        <img className={styles.avatar} src={annaImg} alt="avatar" />
        <div className={styles.info}>
          <div className={styles.heading}>
            <div className={styles.name}>
              <a href="https://github.com/muannna">
                <img src={githubImg} alt="github" className={styles.github} />
              </a>
              <h4>Anna Musikhina</h4>
            </div>
            <p>Frontend developer</p>
          </div>
          <p className={styles.quote}>
            <span>❝</span>For a long time it was a mystery to me how something very expensive and
            technologically advanced could be so useless. And I soon realized that a computer is a
            stupid machine that has the ability to do incredibly smart things, while programmers are
            smart people who have a talent for doing incredibly stupid things. In short, they found
            each other.<span>❞</span>
          </p>
        </div>
      </div>
      <div className={styles.teamMember}>
        <img className={styles.avatar} src={mariaImg} alt="avatar" />
        <div className={styles.info}>
          <div className={styles.heading}>
            <div className={styles.name}>
              <h4>Maryia Huchkova</h4>
              <a href="https://github.com/sleepyMaryAlex">
                <img src={githubImg} alt="github" className={styles.github} />
              </a>
            </div>
            <p>Frontend developer</p>
          </div>
          <p className={styles.quote}>
            <span>❝</span>Programming is hard. The basic rules on which everything is built are very
            simple, but as the program develops, it itself begins to introduce its own rules and
            laws. Thus, the programmer builds a labyrinth in which he himself can get lost.
            <span>❞</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
