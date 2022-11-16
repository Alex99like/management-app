import { useAuth } from '../../../hooks/useAuth';
import Button from '../../components/Button/Button';
import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  const classNames: string[] = ['last', 'second', 'first', 'basic', 'first', 'second', 'last'];
  const error = 401;
  const { routes } = useAuth();

  return (
    <div className={styles.notFound}>
      <div className={styles.error}>
        {classNames.map((className, index) => (
          <p className={styles[className]} key={error + index}>
            {error + index}
          </p>
        ))}
      </div>
      <p className={styles.title}>The page you were looking for could not be found</p>
      <Button
        title={routes === 'private' ? 'Go To Welcome Page' : 'Go To Main Page'}
        link={routes === 'private' ? '/' : '/main'}
      />
    </div>
  );
}

export default NotFoundPage;
